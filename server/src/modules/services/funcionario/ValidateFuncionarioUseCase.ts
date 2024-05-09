import { Funcionario } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { ValidateFuncionarioDTO } from "../../interfaces/funcionarioDTOs";
import { AppError } from "../../../errors/error";

const bcrypt = require('bcrypt');

export class ValidateFuncionarioUseCase {
    async execute({ email, temporaryPassword, newPassword }: ValidateFuncionarioDTO): Promise< Pick<Funcionario, "name" | "email" | "cargo" | "validated" >> {
        
        if( !email || !temporaryPassword || newPassword ){
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }
        
        const funcionario = await prisma.funcionario.findFirst({
            where: {
                email,
                validated: false
            }
        });

        if (!funcionario) {
            throw new AppError("Email não cadastrado ou funcionário já validado!");
        }

        const isPasswordValid = bcrypt.compareSync(temporaryPassword, funcionario.password);

        if (!isPasswordValid) {
            throw new AppError("Senha inválida!");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);

        const funcionarioUpdate = await prisma.funcionario.update({
            where: {
                email,
            },
            data: {
                password: hash,
                validated: true
            }
        });

        if (!funcionarioUpdate) {
            throw new AppError("Erro ao autenticar funcionário!");
        }

        return {
            name: funcionarioUpdate.name,
            email: funcionarioUpdate.email,
            cargo: funcionarioUpdate.cargo,
            validated: funcionarioUpdate.validated
        };
    }
}