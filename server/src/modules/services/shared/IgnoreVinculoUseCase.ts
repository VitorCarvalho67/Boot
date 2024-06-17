import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { EntidadeEnum, ReagirVinculoDTO } from "../../interfaces/sharedDTOs";
import { FindEntidade } from "./helpers/helpers";

export class IgnoreVinculoUseCase {
    async execute({ email, sender, recipient, senderIdentifier, recipientIdentifier }: ReagirVinculoDTO) {
        if (!email || !sender || !recipient || !senderIdentifier || !recipientIdentifier) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        if (recipient != email) {
            throw new AppError("Rementente inválido");
        }

        const senderIdentifierValue = EntidadeEnum[senderIdentifier];
        const recipientIdentifierValue = EntidadeEnum[recipientIdentifier];

        const senderData = await FindEntidade(sender, senderIdentifierValue);
        const recipientData = await FindEntidade(recipient, recipientIdentifierValue);

        if (!senderData) {
            throw new AppError(`${senderIdentifier.charAt(0).toUpperCase()}${senderIdentifier.slice(1).toLowerCase()} não encontrado.`);
        }

        if (!recipientData) {
            throw new AppError(`${recipientIdentifier.charAt(0).toUpperCase()}${recipientIdentifier.slice(1).toLowerCase()} não encontrado.`);
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
            throw new AppError("Solicitação inexistente");
        }

        await prisma.vinculo.delete({
            where: {
                id: vinculoExists.id,
                accepted: false
            }
        });

        return "Solicitação ignorada!";
    }
}
