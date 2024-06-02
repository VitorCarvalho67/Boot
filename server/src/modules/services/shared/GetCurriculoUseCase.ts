import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";

export class GetCurriculoUseCase {
    async execute(rm : string) {
        if (!rm) {
            throw new AppError("Parâmentros insufientes ou inválidos.");
        }

        const aluno = await prisma.aluno.findFirst({
            where: {
                rm
            },
        });

        if (!aluno) {
            throw new AppError("Aluno não encontrado.");
        }

        return {
            curriculo: aluno.curriculo,
            nome: aluno.name,
            endereco: aluno.endereco,
            nascimento: aluno.dataNascimento,
            email: aluno.email
        };
    }
}