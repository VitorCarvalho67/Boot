import { Aluno } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { validateRecoveryDTO } from "../../interfaces/alunoDTOs"
import { AppError } from "../../../errors/error";
import { generateAccessTokenAluno } from "../../../jwt/jwtServices";

const bcrypt = require('bcrypt');

export class ValidateRecoveryUseCase {
    async execute({email, recoveryPassword, newPass} : validateRecoveryDTO): Promise<{token: string, aluno: Omit<Aluno, 'password' | 'alunoImagem' | 'turmas' | 'dataNascimento' | 'disciplina' | 'rm' | 'createdAt' | 'updatedAt' | 'recoveryPass' | 'tentativasRestantes'>}>{
        const aluno = await prisma.aluno.findFirst({
            where: {
                email
            }
        });

        if (!aluno){
            throw new AppError("Email ou senha de recuperação inválidos");
        } else{
            const isPasswordValid = bcrypt.compareSync(recoveryPassword, aluno.recoveryPass);

            if (!isPasswordValid){
                throw new AppError("Senha temporária inválida");
            }  else{
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(newPass, salt); 
                
                await prisma.aluno.update({
                    where: {
                        email
                    },
                    data: {
                        password: hash,
                        tentativasRestantes: 5
                    }
                });
                
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
    }
}