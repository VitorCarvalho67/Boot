import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { generateAccessTokenProfessor } from "../../../jwt/jwtServices";

export class RefreshTokenUseCase {
    async execute(email: string ): Promise<{ token: string, message: string }> {

        if (!email) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const professor = await prisma.professor.findFirst({
            where: {
                email
            }
        });

        if (!professor) {
            throw new AppError("Email inválido");
        }

        const token = generateAccessTokenProfessor(professor);

        if (!token) {
            throw new AppError("Email inválido");
        }

        return {
            token: token,
            message: "token atualizado com sucesso!"
        }
    }
}