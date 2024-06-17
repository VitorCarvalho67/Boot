import { prisma } from "../../../prisma/client";
import { CreateMessageDTO, EntidadeEnum } from '../../interfaces/sharedDTOs';
import { AppError } from "../../../errors/error";
import { FindEntidade } from "./helpers/helpers";

export class CreateMessageUseCase {
    async execute({ email, message, sender, recipient, senderIdentifier, recipientIdentifier }: CreateMessageDTO) {
        
        if(!email || !message || !sender || !recipient || !senderIdentifier || !recipientIdentifier){
            throw new AppError("Parâmetros insuficientes ou inválidos!");
        }

        const senderData = await FindEntidade(sender, senderIdentifier);
        const recipientData = await FindEntidade(recipient, recipientIdentifier);

        if (!senderData || senderData.email != email){
            throw new AppError("Remetente inválido!");
        }

        if (!recipientData || (recipient == sender)){
            throw new AppError("Destinatário inválido!");
        }

        const senderId = senderData.id;
        const recipientId = recipientData.id;

        console.log(senderId, senderIdentifier, recipientId, recipientIdentifier, message);

        const data: any = {
            conteudo: message,
        };

        switch (senderIdentifier) {
            case 'ALUNO':
                data.alunoRemetenteId = senderId;
                break;
            case 'PROFESSOR':
                data.professorRemetenteId = senderId;
                break;
            case 'FUNCIONARIO':
                data.funcionarioRemetenteId = senderId;
                break;
            case 'EMPRESA':
                data.empresaRemetenteId = senderId;
                break;
            default:
                throw new AppError("Tipo de remetente inválido!");
        }

        switch (recipientIdentifier) {
            case 'ALUNO':
                data.alunoDestinatarioId = recipientId;
                break;
            case 'PROFESSOR':
                data.professorDestinatarioId = recipientId;
                break;
            case 'FUNCIONARIO':
                data.funcionarioDestinatarioId = recipientId;
                break;
            case 'EMPRESA':
                data.empresaDestinatarioId = recipientId;
                break;
            default:
                throw new AppError("Tipo de destinatário inválido!");
        }

        await prisma.mensagem.create({
            data,
        });

        return ("Mensagem enviada com sucesso!");
    }
}
