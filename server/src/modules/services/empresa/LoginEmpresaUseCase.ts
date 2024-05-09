import { Empresa } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { LoginEmpresaDTO } from "../../interfaces/empresaDTOs"
import { AppError } from "../../../errors/error";
import { generateAccessTokenEmpresa } from "../../../jwt/jwtServices";

const bcrypt = require('bcrypt');

export class LoginEmpresaUseCase {
    async execute({ cnpj, password }: LoginEmpresaDTO): Promise<{ token: string, empresa: Pick<Empresa, 'name' | 'email'> }> {

        if (!cnpj || !password) {
            throw new AppError("Parâmetros inválidos.");
        }

        if (cnpj.length !== 14) {
            throw new AppError("O CNPJ deve conter exatamente 14 dígitos.");
        }

        const empresaCNPJ = await prisma.empresa.findFirst({
            where: {
                cnpj,
            }
        });

        if (!empresaCNPJ) {
            throw new AppError("CNPJ inválido.");
        }

        const empresa = await prisma.empresa.findFirst({
            where: {
                cnpj,
                validated: true
            }
        });

        if (!empresa) {
            throw new AppError("Empresa não validada.");
        }

        const isPasswordValid = bcrypt.compareSync(password, empresa.password);

        if (!isPasswordValid) {
            throw new AppError("Combinação de CNPJ e senha inválida");
        }

        const token = generateAccessTokenEmpresa(empresa);

        if (!token) {
            throw new AppError("Email ou senha inválidos");
        }

        return {
            token: token,
            empresa: {
                name: empresa.name,
                email: empresa.email
            }
        }
    }
}