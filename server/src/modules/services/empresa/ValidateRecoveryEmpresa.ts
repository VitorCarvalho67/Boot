import { Empresa } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { ValidateRecoveryEmpresaDTO } from "../../interfaces/empresaDTOs"
import { AppError } from "../../../errors/error";
import { generateAccessTokenEmpresa } from "../../../jwt/jwtServices";

const bcrypt = require('bcrypt');

export class ValidateRecoveryEmpresaUseCase {
    async execute({ cnpj, token, newPass }: ValidateRecoveryEmpresaDTO): Promise<{ token: string, empresa: Pick<Empresa, 'cnpj' | 'email'> }> {
        
        if( !cnpj || !token || !newPass ){
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }
        
        const empresa = await prisma.empresa.findFirst({
            where: {
                cnpj
            }
        });

        if (!empresa) {
            throw new AppError("CNPJ ou senha de recuperação inválidos.");
        } else {
            const isTokenValid = bcrypt.compareSync(token, empresa.token);

            if (!isTokenValid) {
                throw new AppError("Token de recuperação inválido.");
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(newPass, salt);

                await prisma.empresa.update({
                    where: {
                        cnpj
                    },
                    data: {
                        password: hash,
                        tentativasRestantes: 5
                    }
                });

                const token = generateAccessTokenEmpresa(empresa);

                if (!token) {
                    throw new AppError("CNPJ ou senha inválidos.");
                }

                return {
                    token: token,
                    empresa: {
                        cnpj: empresa.cnpj,
                        email: empresa.email
                    }
                }
            }
        }
    }
}