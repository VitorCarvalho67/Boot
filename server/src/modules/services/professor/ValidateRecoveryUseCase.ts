import { Professor } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { ValidateRecoveryDTO } from "../../interfaces/professorDTOs"
import { AppError } from "../../../errors/error";
import { generateAccessTokenProfessor } from "../../../jwt/jwtServices";

const bcrypt = require('bcrypt');

export class ValidateRecoveryUseCase {
    async execute({ email, recoveryPass, newPass }: ValidateRecoveryDTO): Promise<{ token: string, professor: Pick<Professor, 'name' | 'email' | 'id' | 'tituloPrincipal'> }> {
        const professor = await prisma.professor.findFirst({
            where: {
                email
            }
        });

        if (!professor) {
            throw new AppError("Email ou senha de recuperação inválidos");
        } else {
            const isPasswordValid = bcrypt.compareSync(recoveryPass, professor.recoveryPass);

            if (!isPasswordValid) {
                throw new AppError("Senha temporária inválida");
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(newPass, salt);

                await prisma.professor.update({
                    where: {
                        email
                    },
                    data: {
                        password: hash,
                        tentativasRestantes: 5
                    }
                });

                const token = generateAccessTokenProfessor(professor);

                if (!token) {
                    throw new AppError("Email ou senha inválidos");
                }

                return {
                    token: token,
                    professor: {
                        id: professor.id,
                        name: professor.name,
                        email: professor.email,
                        tituloPrincipal: professor.tituloPrincipal
                    }
                }
            }
        }
    }
}