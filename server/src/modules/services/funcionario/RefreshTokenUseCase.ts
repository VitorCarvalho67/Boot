import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { generateAccessTokenFuncionario } from "../../../jwt/jwtServices";

export class RefreshTokenUseCase {
    async execute(email: string ): Promise<{ token: string, message: string }> {

        if (!email) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const funcionario = await prisma.funcionario.findFirst({
            where: {
                email
            }
        });

        if (!funcionario) {
            throw new AppError("Email inválido");
        }

        const token = generateAccessTokenFuncionario(funcionario);

        if (!token) {
            throw new AppError("Email inválido");
        }

        return {
            token: token,
            message: "token atualizado com sucesso!"
        }
    }
}