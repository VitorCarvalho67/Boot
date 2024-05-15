import { Aluno } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { RecoveryAlunoDTO } from "../../interfaces/alunoDTOs"
import { AppError } from "../../../errors/error";
import { generateRecoveryEmail } from "../../../mail/templates/aluno/recovery";
import transporter from "../../../mail/config/email";
import nodemailer from 'nodemailer';

const bcrypt = require('bcrypt');

export class RecoveryAluno {
    async execute({ name, email }: RecoveryAlunoDTO) {

        if (!name || !email) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const alunoExists = await prisma.aluno.findUnique({
            where: {
                name,
                email
            }
        });

        if (!alunoExists) {
            throw new AppError("Nome ou email inválidos");
        }

        else {
            const dominio_cps = "@etec.sp.gov.br";

            if (!email.includes(dominio_cps)) {
                throw new AppError("Email inválido");
            }

            else {
                const salt = bcrypt.genSaltSync(10);
                const token: string = Array(8).fill(0).map(() => Math.random().toString(36).charAt(2)).join('').toUpperCase();
                const hash = bcrypt.hashSync(token, salt);

                await prisma.aluno.update({
                    where: {
                        name,
                        email
                    },
                    data: {
                        recoveryPass: hash
                    }
                });

                const nome = alunoExists.name.split(' ').shift()?.toString() ?? 'aluno';

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Boot - Código de recuperação',
                    html: generateRecoveryEmail(nome, token)
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        throw new AppError("Erro ao enviar email: " + error);
                    } else {
                        console.log('E-mail enviado:', info.response, token);
                    }
                });
            }
        }

        return;
    }
}