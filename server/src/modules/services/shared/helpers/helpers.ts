import { IdentificadorEnum } from "../../../interfaces/sharedDTOs";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/error";

export const encontrarEntidadePeloEmail = async (email: string, identifier: IdentificadorEnum) => {
    switch (identifier) {
        case IdentificadorEnum.ALUNO:
            return prisma.aluno.findUnique({
                where: { email }
            });
        case IdentificadorEnum.PROFESSOR:
            return prisma.professor.findUnique({
                where: { email }
            });
        default:
            return null;
    }
}