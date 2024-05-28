import { Funcionario } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { ValidateRecoveryDTO } from "../../interfaces/funcionarioDTOs"
import { AppError } from "../../../errors/error";
import { generateAccessTokenFuncionario } from "../../../jwt/jwtServices";

const bcrypt = require('bcrypt');

export class ValidateRecoveryUseCase {
    async execute({ email, recoveryPass, newPass }: ValidateRecoveryDTO): Promise<{ token: string, funcionario: Pick<Funcionario, 'name' | 'email' | 'cargo'> }> {

        const errors = [];

        if (!email) {
            errors.push("O email é obrigatório.");
        }

        if (!recoveryPass) {
            errors.push("A senha temporária é obrigatória.");
        }

        if (!newPass) {
            errors.push("A nova senha é obrigatória.");
        }

        if (errors.length > 0) {
            throw new AppError(errors.join(" "));
        }


        const funcionario = await prisma.funcionario.findFirst({
            where: {
                email
            }
        });

        if (!funcionario) {
            throw new AppError("Email ou senha de recuperação inválidos");
        } else {
            const isPasswordValid = bcrypt.compareSync(recoveryPass, funcionario.recoveryPass);

            if (!isPasswordValid) {
                throw new AppError("Senha temporária inválida");
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(newPass, salt);

                await prisma.funcionario.update({
                    where: {
                        email
                    },
                    data: {
                        password: hash,
                        tentativasRestantes: 5
                    }
                });

                const token = generateAccessTokenFuncionario(funcionario);

                if (!token) {
                    throw new AppError("Email ou senha inválidos");
                }

                return {
                    token: token,
                    funcionario: {
                        name: funcionario.name,
                        email: funcionario.email,
                        cargo: funcionario.cargo
                    }
                }
            }
        }
    }
}