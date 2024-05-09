import { prisma } from "../../../prisma/client";
import { RecoveryProfessorDTO } from "../../interfaces/professorDTOs"
import { AppError } from "../../../errors/error";
import { generateRecoveryEmailProfessor } from "../../../mail/templates/recoveryProfessor";
import transporter from "../../../mail/config/email";

const bcrypt = require('bcrypt');

export class RecoveryProfessorUseCase {
    async execute({ name, email }: RecoveryProfessorDTO) {
        if (name && email && name.trim() !== "" && email.trim() !== "") {
            const professorExists = await prisma.professor.findUnique({
                where: {
                    name,
                    email
                }
            });

            if (!professorExists) {
                throw new AppError("Nome ou email inválidos");
            }

            else {
                const salt = bcrypt.genSaltSync(10);
                const token: string = Array(8).fill(0).map(() => Math.random().toString(36).charAt(2)).join('').toUpperCase();
                const hash = bcrypt.hashSync(token, salt);

                await prisma.professor.update({
                    where: {
                        name,
                        email
                    },
                    data: {
                        recoveryPass: hash
                    }
                });

                const nome = professorExists.name.split(' ').shift()?.toString() ?? 'professor';

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Boot - Código de recuperação',
                    html: generateRecoveryEmailProfessor(nome, token)
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        throw new AppError("Erro ao enviar email: " + error);
                    } else {
                        console.log('E-mail enviado:', info.response, token);
                    }
                });
            }

            return;
        } else {
            throw new AppError("Parâmetros inválidos!");
        }
    }
}