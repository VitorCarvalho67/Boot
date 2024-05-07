import { Aluno } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { LoginAlunoDTO } from "../../interfaces/alunoDTOs"
import { AppError } from "../../../errors/error";
import { generateAccessTokenAluno } from "../../../jwt/jwtServices";

const bcrypt = require('bcrypt');

export class LoginAlunoUseCase {
    async execute({email, password} : LoginAlunoDTO): Promise<{token: string, aluno: Omit<Aluno, 'password' | 'alunoImagem' |'turmas' | 'dataNascimento' | 'disciplina' | 'rm' | 'createdAt' | 'updatedAt' | 'recoveryPass' | 'tentativasRestantes'>}>{
       
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

        const token = generateAccessTokenAluno(aluno);

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