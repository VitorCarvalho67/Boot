import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { VinculoDTO } from "../../interfaces/sharedDTOs";
import { encontrarEntidadePeloEmail } from "./helpers/helpers";

export class DeleteVinculoUseCase {
    async execute({ email, sender, recipient, senderIdentifier, recipientIdentifier }: VinculoDTO) {
        if (!sender || !recipient || !senderIdentifier || !recipientIdentifier) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        if (email != sender && email != recipient) {
            throw new AppError("Usuário não pertence a nenhum dos elos da conexão.");
        }

        const senderData = await encontrarEntidadePeloEmail(sender, senderIdentifier);
        const recipientData = await encontrarEntidadePeloEmail(recipient, recipientIdentifier);

        if (!senderData) {
            throw new AppError(`${senderIdentifier.charAt(0).toUpperCase()}${senderIdentifier.slice(1).toLowerCase()}(a) remetente não encontrado(a).`);
        }

        if (!recipientData) {
            throw new AppError(`${recipientIdentifier.charAt(0).toUpperCase()}${recipientIdentifier.slice(1).toLowerCase()}(a) destinatário não encontrado(a).`);
        }

        const vinculoExists = await prisma.vinculo.findFirst({
            where: {
                alunoId: (senderIdentifier == "ALUNO") ? senderData.id : null,
                professorId: (senderIdentifier == "PROFESSOR") ? senderData.id : null,
                vinculoComAlunoId: (recipientIdentifier == "ALUNO") ? recipientData.id : null,
                vinculoComProfessorId: (recipientIdentifier == "PROFESSOR") ? recipientData.id : null
            },
        });

        if (!vinculoExists) {
            throw new AppError("Vínculo ou solicitação de vínculo inexistente");
        }

        const vinculoAlternativeExists = await prisma.vinculo.findFirst({
            where: {
                alunoId: (senderIdentifier == "ALUNO") ? recipientData.id : null,
                professorId: (senderIdentifier == "PROFESSOR") ? recipientData.id : null,
                vinculoComAlunoId: (recipientIdentifier == "ALUNO") ? senderData.id : null,
                vinculoComProfessorId: (recipientIdentifier == "PROFESSOR") ? senderData.id : null
            },
        });

        if (!vinculoAlternativeExists) {
            throw new AppError("Vínculo ou solicitação de vínculo inexistente");
        }

        await prisma.vinculo.delete({
            where: {
                id: vinculoExists ? vinculoExists.id : vinculoAlternativeExists.id
            }
        });

        return "Vínculo ou solicitacão desfeita!";
    }
}
