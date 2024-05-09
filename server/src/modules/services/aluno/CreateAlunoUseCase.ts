import { Aluno } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { CreateAlunoDTO } from "../../interfaces/alunoDTOs"
import { AppError } from "../../../errors/error";

const bcrypt = require('bcrypt');

export class CreateAlunoUseCase {
    async execute({ email, token }: CreateAlunoDTO): Promise<Pick<Aluno, "name" | "email" >>{

        if( !email || !token ){
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const preAluno = await prisma.preAluno.findUnique({
            where: {
                email
            }
        });

        if (preAluno) {
            const istokenValid = bcrypt.compareSync(token, preAluno.token);

            if (istokenValid) {
                const expirationTime = new Date(preAluno.createdAt.getTime());
                expirationTime.setMinutes(expirationTime.getMinutes() + 10);
                if (preAluno.tentativasRestantes <= 0 || expirationTime.getTime() < Date.now()) {
                    await prisma.preAluno.delete({
                        where: {
                            email
                        }
                    });
                    throw new AppError("Token expirado");
                } else {
                    const aluno = await prisma.aluno.create({
                        data: {
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
                    return {
                        name: aluno.name,
                        email: aluno.email
                    };
                }
            } else {
                const expirationTime = new Date(preAluno.createdAt.getTime());
                expirationTime.setMinutes(expirationTime.getMinutes() + 10);
                if (preAluno.tentativasRestantes <= 0 || expirationTime.getTime() < Date.now()) {
                    await prisma.preAluno.delete({
                        where: {
                            email
                        }
                    });
                    throw new AppError("Tentativas insuficientes ou tempo esgotado");
                } else {
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
                    throw new AppError("Token inválido, tentativas restantes: " + preAluno.tentativasRestantes);
                }
            }
        } else {
            throw new AppError("Email não encontrado");
        }
    }
}