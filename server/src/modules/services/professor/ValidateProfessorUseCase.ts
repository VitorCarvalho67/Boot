import { Professor } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { ValidateProfessorDTO } from "../../interfaces/professorDTOs";
import { AppError } from "../../../errors/error";

const bcrypt = require('bcrypt');

export class ValidateProfessorUseCase {
    async execute({ email, temporaryPassword, newPassword }: ValidateProfessorDTO): Promise<Pick<Professor, "name" | "email" | "tituloPrincipal">> {

        if (!email || !temporaryPassword || !newPassword) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        } else{
            console.log("\n\n\n\n######\n\n\n\n\Senha temporária enviada: " +  temporaryPassword);
        }

        const professorEmail = await prisma.professor.findFirst({
            where: {
                email,
            }
        });

        if (!professorEmail) {
            throw new AppError("Email não cadastrado!");
        }

        const professor = await prisma.professor.findFirst({
            where: {
                email,
                validated: false
            }
        });

        if (!professor) {
            throw new AppError("Professor já validado!");
        }


        const isPasswordValid = bcrypt.compareSync(temporaryPassword, professor.password);

        if (!isPasswordValid) {
            throw new AppError("Senha invalida!");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);

        const professorUpdate = await prisma.professor.update({
            where: {
                email,
            },
            data: {
                password: hash,
                validated: true
            }
        });

        if (!professorUpdate) {
            throw new AppError("Erro ao autenticar professor!");
        }

        return {
            name: professorUpdate.name,
            email: professorUpdate.email,
            tituloPrincipal: professorUpdate.tituloPrincipal
        };
    }
}