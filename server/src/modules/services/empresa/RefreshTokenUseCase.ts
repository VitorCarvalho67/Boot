import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { generateAccessTokenEmpresa } from "../../../jwt/jwtServices";

export class RefreshTokenUseCase {
    async execute(email: string ): Promise<{ token: string, message: string }> {

        if (!email) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const empresa = await prisma.empresa.findFirst({
            where: {
                email
            }
        });

        if (!empresa) {
            throw new AppError("Email inválido");
        }

        const token = generateAccessTokenEmpresa(empresa);

        if (!token) {
            throw new AppError("Email inválido");
        }

        return {
            token: token,
            message: "token atualizado com sucesso!"
        }
    }
}