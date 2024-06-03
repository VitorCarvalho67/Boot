import { Aluno } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { ValidateAlunoDTO } from "../../interfaces/alunoDTOs"
import { AppError } from "../../../errors/error";

const bcrypt = require('bcrypt');

export class ValidateAlunoUseCase {
    async execute({ email, token }: ValidateAlunoDTO): Promise<Pick<Aluno, "name" | "email">> {

        if (!email || !token) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const alunoNotValidated = await prisma.aluno.findUnique({
            where: {
                email
            }
        });

        if (alunoNotValidated) {
            const istokenValid = bcrypt.compareSync(token, alunoNotValidated.token);

            if (istokenValid) {
                const expirationTime = new Date(alunoNotValidated.createdAt.getTime());
                expirationTime.setMinutes(expirationTime.getMinutes() + 10);
                if (alunoNotValidated.tentativasRestantes <= 0 || expirationTime.getTime() < Date.now()) {
                    await prisma.aluno.delete({
                        where: {
                            email
                        }
                    });
                    throw new AppError("Token expirado");
                } else {
                    const aluno = await prisma.aluno.update({
                        where: {
                            name: alunoNotValidated.name,
                            email,
                            password: alunoNotValidated.password
                        },
                        data: {
                            validated: true
                        }
                    });

                    return {
                        name: aluno.name,
                        email: aluno.email
                    };
                }
            } else {
                const expirationTime = new Date(alunoNotValidated.createdAt.getTime());
                expirationTime.setMinutes(expirationTime.getMinutes() + 10);
                if (alunoNotValidated.tentativasRestantes <= 0 || expirationTime.getTime() < Date.now()) {
                    await prisma.aluno.delete({
                        where: {
                            email
                        }
                    });
                    throw new AppError("Tentativas insuficientes ou tempo esgotado");
                } else {
                    await prisma.aluno.update({
                        where: {
                            email
                        },
                        data: {
                            tentativasRestantes: {
                                decrement: 1
                            }
                        }
                    });
                    throw new AppError("Token inválido, tentativas restantes: " + alunoNotValidated.tentativasRestantes);
                }
            }
        } else {
            throw new AppError("Email não encontrado");
        }
    }
}