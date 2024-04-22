import { Aluno } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { LoginAlunoDTO } from "../../dtos/LoginAlunoDTO";
import { AppError } from "../../../../errors/error";
import { generateAccessToken } from "../../../../jwt/jwtServices";

const bcrypt = require('bcrypt');

export class LoginAlunoUseCase {
    async execute({email, password} : LoginAlunoDTO): Promise<{token: string, aluno: Omit<Aluno, 'password' | 'turmas' | 'dataNascimento' | 'disciplina' | 'rm' | 'createdAt' | 'updatedAt' | 'recoveryPass'>}>{
       
        const aluno = await prisma.aluno.findFirst({
            where: {
                email
            }
        });

        if (!aluno){
            throw new AppError("Email ou senha inválidos");
        }

        const isPasswordValid = bcrypt.compareSync(password, aluno.password);

        if (!isPasswordValid){
            throw new AppError("Email ou senha inválidos");
        }

        const token = generateAccessToken(aluno);

        if (!token){
            throw new AppError("Email ou senha inválidos");
        }

        return {
            token: token,
            aluno: {
            id: aluno.id,
            name: aluno.name,
            email: aluno.email
        }}
    }
}