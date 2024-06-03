import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { generateAccessTokenAdmin } from "../../../jwt/jwtServices";

export class RefreshTokenUseCase {
    async execute(email: string ): Promise<{ token: string, message: string }> {

        if (!email) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const admin = await prisma.admin.findFirst({
            where: {
                email
            }
        });

        if (!admin) {
            throw new AppError("Email inválido");
        }

        const token = generateAccessTokenAdmin(admin);

        if (!token) {
            throw new AppError("Email inválido");
        }

        return {
            token: token,
            message: "token atualizado com sucesso!"
        }
    }
}