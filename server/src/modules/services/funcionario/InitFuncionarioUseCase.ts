import { Funcionario } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { InitFuncionarioDTO } from "../../interfaces/funcionarioDTOs";
import { AppError } from "../../../errors/error";

export class InitFuncionarioUseCase {
    async execute({ email, cargo }: InitFuncionarioDTO): Promise<{ funcionario: Pick<Funcionario, 'email' | 'validated'> }> {

        if( !email || !cargo ){
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const funcionario = await prisma.funcionario.findFirst({
            where: {
                email,
                cargo
            }
        });

        if (!funcionario) {
            throw new AppError("Funcionário não encontrado ou cargo errado");
        }

        return {
            funcionario: {
                email: funcionario.email,
                validated: funcionario.validated
            }
        }
    }
}