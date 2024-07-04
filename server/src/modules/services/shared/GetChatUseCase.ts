import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { EntidadeEnum, GetMessageBetweenDTO } from "../../interfaces/sharedDTOs";
import { FindEntidade } from "./helpers/helpers";
import { minioClient } from "../../../minioService";

export class GetMessagesBetweenUseCase {
    async execute({ email1, identifier1, email2, identifier2 }: GetMessageBetweenDTO) {
        
        console.log(email1, identifier1, email2, identifier2);

        if (!email1 || !identifier1 || !email2 || !identifier2) {
            throw new AppError("Parâmetros insufientes ou inválidos.");
        }

        const entidade1 = await FindEntidade(email1, EntidadeEnum[identifier1]);
        const entidade2 = await FindEntidade(email2, EntidadeEnum[identifier2]);

        if (!entidade1) {
            throw new AppError(`Entidade ${identifier1} não encontrada.`);
        }

        if (!entidade2) {
            throw new AppError(`Entidade ${identifier2} não encontrada.`);
        }

        const entidade1Id = entidade1.id;
        const entidade2Id = entidade2.id;

        const messages = await prisma.mensagem.findMany({
            where: {
                OR: [
                    {
                        AND: [
                            { alunoRemetenteId: entidade1Id, alunoDestinatarioId: entidade2Id },
                            // { professorRemetenteId: entidade1Id, professorDestinatarioId: entidade2Id },
                            // { funcionarioRemetenteId: entidade1Id, funcionarioDestinatarioId: entidade2Id },
                            // { empresaRemetenteId: entidade1Id, empresaDestinatarioId: entidade2Id }
                        ]
                    },
                    {
                        AND: [
                            { alunoRemetenteId: entidade2Id, alunoDestinatarioId: entidade1Id }
                            // { professorRemetenteId: entidade2Id, professorDestinatarioId: entidade1Id },
                            // { funcionarioRemetenteId: entidade2Id, funcionarioDestinatarioId: entidade1Id },
                            // { empresaRemetenteId: entidade2Id, empresaDestinatarioId: entidade1Id }
                        ]
                    }
                ]
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const messagesWithSender = messages.map(message => {
            let sender = 'other';
            if (message.alunoRemetenteId === entidade1Id) {
                sender = 'me';
            }
            return {
                ...message,
                sender
            };
        });

        const bucketName = 'boot';
        const imageName = entidade2.imagem as string;
        
        let entityUrl = "default";
        
        if (imageName) {
            const objectExists = await minioClient.statObject(bucketName, imageName);
            if(objectExists){
                entityUrl = await minioClient.presignedUrl('GET', bucketName, imageName, 24 * 60 * 60);
            }
        }

        // let endereco: string | null = null;

        // if (identifier2 === "ALUNO" && entidade2.endereco) {
        //     endereco = entidade2.endereco;
        // }

        return {
            entidade:{
                nome: entidade2.name,
                email: entidade2.email,
                // endereco: (identifier2 == "ALUNO")? entidade2.endereco : null,
                url: entityUrl
            },
            messages: messagesWithSender
        };
    }
}
