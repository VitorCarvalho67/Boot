import { Funcionario } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { LoginFuncionarioDTO } from "../../interfaces/funcionarioDTOs";
import { AppError } from "../../../errors/error";
import { generateAccessTokenFuncionario } from "../../../jwt/jwtServices";

const bcrypt = require('bcrypt');

export class LoginFuncionarioUseCase {
    async execute({ email, password }: LoginFuncionarioDTO): Promise<{ token: string, funcionario: Pick<Funcionario, 'name' | 'email' | 'cargo'> }> {

        if (!email || !password) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const funcionario = await prisma.funcionario.findFirst({
            where: {
                email,
                validated: true
            }
        });

        if (!funcionario) {
            throw new AppError("Funcionário não encontrado ou não validado");
        }

        const isPasswordValid = bcrypt.compareSync(password, funcionario.password);

        if (!isPasswordValid) {
            throw new AppError("Email ou senha inválidos");
        }

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