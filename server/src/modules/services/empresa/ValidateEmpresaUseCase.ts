import { Empresa } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { ValidateEmpresaDTO } from "../../interfaces/empresaDTOs"
import { AppError } from "../../../errors/error";

const bcrypt = require('bcrypt');

export class ValidateEmpresaUseCase {
    async execute({ cnpj, token }: ValidateEmpresaDTO): Promise<Pick<Empresa, 'name' | 'email' | 'validated'>> {

        const preEmpresa = await prisma.empresa.findUnique({
            where: {
                cnpj
            }
        });

        if (preEmpresa) {
            const istokenValid = bcrypt.compareSync(token, preEmpresa.token);

            if (istokenValid) {
                const expirationTime = new Date(preEmpresa.createdAt.getTime());
                expirationTime.setMinutes(expirationTime.getMinutes() + 10);
                if (preEmpresa.tentativasRestantes <= 0 || expirationTime.getTime() < Date.now()) {
                    await prisma.empresa.delete({
                        where: {
                            cnpj
                        }
                    });
                    throw new AppError("Token expirado");
                } else {
                    const empresa = await prisma.empresa.update({
                        where: {
                            cnpj
                        },
                        data: {
                            validated: true
                        }
                    });

                    return{
                        name: empresa.name,
                        email: empresa.email,
                        validated: empresa.validated
                    };
                }

            } else {
                const expirationTime = new Date(preEmpresa.createdAt.getTime());
                expirationTime.setMinutes(expirationTime.getMinutes() + 10);
                if (preEmpresa.tentativasRestantes <= 0 || expirationTime.getTime() < Date.now()) {
                    await prisma.empresa.delete({
                        where: {
                            cnpj
                        }
                    });
                    throw new AppError("Tentativas insuficientes ou tempo esgotado");
                } else {
                    await prisma.empresa.update({
                        where: {
                            cnpj
                        },
                        data: {
                            tentativasRestantes: {
                                decrement: 1
                            }
                        }
                    });
                    throw new AppError("Token inválido, tentativas restantes: " + (preEmpresa.tentativasRestantes - 1));
                }
            }
        } else {
            throw new AppError("CNPJ não encontrado");
        }
    }
}