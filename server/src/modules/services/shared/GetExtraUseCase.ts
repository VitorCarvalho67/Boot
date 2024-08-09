import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";

export class GetExtracurricularsByRMUseCase {
    async execute(rm: string) {
        if (!rm) {
            throw new AppError("Parâmetros insuficientes ou inválidos. " + rm);
        }

        const aluno = await prisma.aluno.findFirst({
            where: {
                rm: rm,
            },
            select: {
                cursosExtracurriculares: {
                    select: {
                        extracurricularId: true,
                        instituicao: true,
                        descricao: true,
                        inicio: true,
                        fim: true,
                    },
                },
            },
        });

        if (!aluno) {
            throw new AppError("Aluno não encontrado.");
        }

        return aluno.cursosExtracurriculares;
    }
}