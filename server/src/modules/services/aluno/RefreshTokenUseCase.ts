import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { generateAccessTokenAluno } from "../../../jwt/jwtServices";

export class RefreshTokenUseCase {
    async execute(email: string): Promise<{ token: string, message: string }> {

        if (!email) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const aluno = await prisma.aluno.findFirst({
            where: {
                email
            }
        });

        if (!aluno) {
            throw new AppError("Email inválido");
        }

        const token = generateAccessTokenAluno(aluno);

        if (!token) {
            throw new AppError("Email inválido");
        }

        return {
            token: token,
            message: "token atualizado com sucesso!"
        }
    }
}