import { Professor } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { LoginProfessorDTO } from "../../interfaces/professorDTOs";
import { AppError } from "../../../errors/error";
import { generateAccessTokenProfessor } from "../../../jwt/jwtServices";

const bcrypt = require('bcrypt');

export class LoginProfessorUseCase {
    async execute({ email, password }: LoginProfessorDTO): Promise<{ token: string, professor: Pick<Professor, 'name' | 'email' | 'tituloPrincipal'> }> {

        const professor = await prisma.professor.findFirst({
            where: {
                email,
                validated: true
            }
        });

        if (!professor) {
            throw new AppError("Prrofessor não encontrado ou não validado");
        }

        const isPasswordValid = bcrypt.compareSync(password, professor.password);

        if (!isPasswordValid) {
            throw new AppError("Email ou senha inválidos");
        }

        const token = generateAccessTokenProfessor(professor);

        if (!token) {
            throw new AppError("Email ou senha inválidos");
        }

        return {
            token: token,
            professor: {
                name: professor.name,
                email: professor.email,
                tituloPrincipal: professor.tituloPrincipal
            }
        }
    }
}