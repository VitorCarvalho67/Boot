import { Funcionario } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { RecoveryFuncionarioDTO } from "../../interfaces/funcionarioDTOs"
import { AppError } from "../../../errors/error";
import { generateRecoveryEmailFuncionario } from "../../../mail/templates/recoveryFuncionario";
import transporter from "../../../mail/config/email";
import nodemailer from 'nodemailer';

const bcrypt = require('bcrypt');

export class RecoveryFuncionarioUseCase {
    async execute({ name, email }: RecoveryFuncionarioDTO) {

        if( !name || !email ){
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        if (name && email && name.trim() !== "" && email.trim() !== "") {
            const funcionarioExists = await prisma.funcionario.findUnique({
                where: {
                    name,
                    email
                }
            });

            if (!funcionarioExists) {
                throw new AppError("Nome ou email inválidos");
            }

            else {
                const salt = bcrypt.genSaltSync(10);
                const token: string = Array(8).fill(0).map(() => Math.random().toString(36).charAt(2)).join('').toUpperCase();
                const hash = bcrypt.hashSync(token, salt);

                await prisma.funcionario.update({
                    where: {
                        name,
                        email
                    },
                    data: {
                        recoveryPass: hash
                    }
                });

                const nome = funcionarioExists.name.split(' ').shift()?.toString() ?? 'funcionario';

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Boot - Código de recuperação',
                    html: generateRecoveryEmailFuncionario(nome, token)
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