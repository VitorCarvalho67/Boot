import { Aluno } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateAlunoDTO } from "../../dtos/CreateAlunoDTO";
import { AppError } from "../../../../errors/error";
import e from "express";

export class CreateAlunoUseCase {
    async execute({email, token} : CreateAlunoDTO): Promise<Aluno>{

        const preAluno = await prisma.preAluno.findUnique({
            where: {
                email
            }
        });

        if (preAluno){
            const preAluno = await prisma.preAluno.findUnique({
                where: {
                    email,
                    token
                }
            });

            if (preAluno){
                if(preAluno.tentativasRestantes <= 0 || (preAluno.createdAt.setMinutes(preAluno.createdAt.getMinutes() + 10)) > Date.now()) {
                    await prisma.preAluno.delete({
                        where: {
                            email
                        }
                    });
                    throw new AppError("Token expirado");    
                }else {
                    const aluno = await prisma.aluno.create({
                        data:{
                            name: preAluno.name,
                            email,
                            password: preAluno.password
                        }
                    });
            
                    await prisma.preAluno.delete({
                        where: {
                            email
                        }
                    });
                    return aluno;
                }

            }else {
                await prisma.preAluno.update({
                    where: {
                        email
                    },
                    data: {
                        tentativasRestantes: {
                            decrement: 1
                        }
                    }
                });
                throw new AppError("Token inválido");
            }
        }else {
            throw new AppError("Email não encontrado");
        }
    }
}