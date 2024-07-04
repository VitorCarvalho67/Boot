import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { EntidadeEnum, GetEntidadeDTO } from "../../interfaces/sharedDTOs";
import { FindEntidade } from "./helpers/helpers";
import { minioClient } from "../../../minioService";

interface LastMessageDTO {
    entity: {
        type: string;
        email: string;
        name: string;
        url: string;
    };
    sentBy: string;
    sentAt: Date;
    content: string;
}

export class GetLastMessagesUseCase {
    async execute({ email, identifier }: GetEntidadeDTO): Promise<LastMessageDTO[]> {
        if (!email) {
            throw new AppError("Campo 'email' é necessário.");
        }

        if (!identifier) {
            throw new AppError("Campo 'identifier' é necessário.");
        }

        const entidade = await FindEntidade(email, EntidadeEnum[identifier]);

        if (!entidade) {
            throw new AppError(`${identifier.charAt(0).toUpperCase()}${identifier.slice(1).toLowerCase()} não encontrado.`);
        }

        const entidadeId = entidade.id;

        const messages = await prisma.mensagem.findMany({
            where: {
                OR: [
                    { alunoRemetenteId: entidadeId },
                    { professorRemetenteId: entidadeId },
                    { funcionarioRemetenteId: entidadeId },
                    { empresaRemetenteId: entidadeId },
                    { alunoDestinatarioId: entidadeId },
                    { professorDestinatarioId: entidadeId },
                    { funcionarioDestinatarioId: entidadeId },
                    { empresaDestinatarioId: entidadeId },
                ]
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                alunoRemetente: true,
                professorRemetente: true,
                funcionarioRemetente: true,
                empresaRemetente: true,
                alunoDestinatario: true,
                professorDestinatario: true,
                funcionarioDestinatario: true,
                empresaDestinatario: true,
            },
        });

        const uniqueMessages = new Map<string, LastMessageDTO>();

        for (const message of messages) {
            const isSent = message.alunoRemetenteId === entidadeId || message.professorRemetenteId === entidadeId || message.funcionarioRemetenteId === entidadeId || message.empresaRemetenteId === entidadeId;
            const otherEntity = isSent ? message.alunoDestinatario || message.professorDestinatario || message.funcionarioDestinatario || message.empresaDestinatario :
                                        message.alunoRemetente || message.professorRemetente || message.funcionarioRemetente || message.empresaRemetente;

            if (!otherEntity) continue;

            const entityType = isSent ? this.getEntityTypeFromDestinatario(message) : this.getEntityTypeFromRemetente(message) as EntidadeEnum;
            const entityEmail = otherEntity.email;
            const entityName = otherEntity.name;

            const bucketName = 'boot';
            const imageName = otherEntity.imagem as string;
            
            let entityUrl = "default";
            
            if (imageName) {
                const objectExists = await minioClient.statObject(bucketName, imageName);
                if(objectExists){
                    entityUrl = await minioClient.presignedUrl('GET', bucketName, imageName, 24 * 60 * 60);
                }
            }

            const sentBy = isSent ? 'sent' : 'received';
            const sentAt = message.createdAt;
            const content = message.conteudo;

            const key = `${entityType}-${entityEmail}`;

            if (!uniqueMessages.has(key)) {
                uniqueMessages.set(key, { 
                    entity: {
                        type: entityType,
                        email: entityEmail,
                        name: entityName,
                        url: entityUrl
                    },
                    sentBy,
                    sentAt,
                    content
                });
            }
        }

        return Array.from(uniqueMessages.values());
    }

    private getEntityTypeFromDestinatario(message: any): string {
        if (message.alunoDestinatarioId) return 'Aluno';
        if (message.professorDestinatarioId) return 'Professor';
        if (message.funcionarioDestinatarioId) return 'Funcionario';
        if (message.empresaDestinatarioId) return 'Empresa';
        return '';
    }

    private getEntityTypeFromRemetente(message: any): string {
        if (message.alunoRemetenteId) return 'Aluno';
        if (message.professorRemetenteId) return 'Professor';
        if (message.funcionarioRemetenteId) return 'Funcionario';
        if (message.empresaRemetenteId) return 'Empresa';
        return '';
    }
}