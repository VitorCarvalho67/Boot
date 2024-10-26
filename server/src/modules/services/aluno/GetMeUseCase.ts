import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";

export class GetMeUseCase {
    async execute( email: string ) {
        if (!email) {
            throw new AppError("Parâmetros insufientes ou inválidos. ");
        }

        const aluno = await prisma.aluno.findFirst({
            where: {
                email
            },
        });

        if (!aluno) {
            throw new AppError("Aluno não encontrado.");
        }

        return {
            email: email,
            rm: aluno.rm,
            name: aluno.name
        }
    }
}