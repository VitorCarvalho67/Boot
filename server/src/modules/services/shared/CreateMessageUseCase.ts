import { prisma } from "../../../prisma/client";
import { CreateMessageDTO, EntidadeEnum } from '../../interfaces/sharedDTOs';
import { AppError } from "../../../errors/error";
import { FindEntidade } from "./helpers/helpers";

export class CreateMessageUseCase {
    async execute({ message, sender, recipient, senderIdentifier, recipientIdentifier }: CreateMessageDTO) {
        
        if (!message) {
            throw new AppError("Parâmetro 'message' está ausente ou inválido!");
        }
        if (!sender) {
            throw new AppError("Parâmetro 'sender' está ausente ou inválido!");
        }
        if (!recipient) {
            throw new AppError("Parâmetro 'recipient' está ausente ou inválido!");
        }
        if (!senderIdentifier) {
            throw new AppError("Parâmetro 'senderIdentifier' está ausente ou inválido!");
        }
        if (!recipientIdentifier) {
            throw new AppError("Parâmetro 'recipientIdentifier' está ausente ou inválido!");
        }        

        const senderData = await FindEntidade(sender, senderIdentifier);
        const recipientData = await FindEntidade(recipient, recipientIdentifier);

        if (!senderData){
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

        return {
            message: {
                conteudo: message,
                email: recipient,
                identifier: recipientIdentifier,
            }
        };
    }
}
