import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";

export class GetExtracurricularsByEmailUseCase {
    async execute(email: string) {
        if (!email) {
            throw new AppError("Parâmetros insuficientes ou inválidos. " + email);
        }

        const aluno = await prisma.aluno.findFirst({
            where: {
                email: email,
            },
            select: {
                name: true,
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

        return {
            nome: aluno.name,
            cursosExtracurriculares: aluno.cursosExtracurriculares,
        };
    }
}