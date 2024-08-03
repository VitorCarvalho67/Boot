import { prisma } from "../../../prisma/client";
import { SetEmpresaParceiraDTO } from "../../interfaces/funcionarioDTOs";
import { AppError } from "../../../errors/error";

export class SetEmpresaParceiraUseCase {
    async execute({ funcionarioId, emailEmpresa }: SetEmpresaParceiraDTO) {
        if (!funcionarioId || !emailEmpresa) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const funcionario = await prisma.funcionario.findUnique({
            where: {
                id: funcionarioId
            }
        });

        if (!funcionario) {
            throw new AppError("Funcionário não encontrado.");
        }

        const empresa = await prisma.empresa.findUnique({
            where: {
                email: emailEmpresa
            }
        });

        if (!empresa) {
            throw new AppError("Empresa não encontrada.");
        }

        const empresaParceira = await prisma.empresa.update({
            where: {
                id: emailEmpresa
            },
            data: {
                patrocinador: true
            }
        });

        return empresaParceira;
    }
}
