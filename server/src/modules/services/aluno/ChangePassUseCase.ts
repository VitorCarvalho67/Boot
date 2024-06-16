import { prisma } from "../../../prisma/client";
import { UpdatePassDTO } from "../../interfaces/alunoDTOs"
import { AppError } from "../../../errors/error";

const bcrypt = require('bcrypt');

export class ChangePassUseCase {
    async execute({ email, oldPass, newPass }: UpdatePassDTO) {

        if (!email) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const aluno = await prisma.aluno.findUnique({
            where: {
                email
            }
        });

        if (aluno) {
            const isPasswordValid = bcrypt.compareSync(oldPass, aluno.password);
    
            if (!isPasswordValid) {
                throw new AppError("Senha atual inválida");
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(newPass, salt);


            await prisma.aluno.update({
                where: {
                    email
                },
                data: {
                    password: hash
                }
            });

            return;
        } else {
            throw new AppError("Aluno não encontrado");
        }
    }
}