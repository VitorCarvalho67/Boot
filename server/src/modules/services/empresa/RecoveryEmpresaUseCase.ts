import { prisma } from "../../../prisma/client";
import { RecoveryEmpresaDTO } from "../../interfaces/empresaDTOs"
import { AppError } from "../../../errors/error";
import { generateRecoveryEmpresaEmail } from "../../../mail/templates/empresa/recoveryEmpresa";
import transporter from "../../../mail/config/email";

const bcrypt = require('bcrypt');

export class RecoveryEmpresaUseCase {
    async execute({ cnpj, email }: RecoveryEmpresaDTO) {

        if (!cnpj || !email) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const empresaExists = await prisma.empresa.findUnique({
            where: {
                cnpj,
                email,
                validated: true
            }
        });

        if (!empresaExists) {
            throw new AppError("CNPJ ou email inválidos");
        }

        else {
            const salt = bcrypt.genSaltSync(10);
            const token = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
            const hash = bcrypt.hashSync(token, salt);

            await prisma.empresa.update({
                where: {
                    cnpj,
                    email
                },
                data: {
                    token: hash,
                }
            });

            const nome = empresaExists.name.split(' ').shift()?.toString() ?? 'empresa';

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Boot - Código de recuperação',
                html: generateRecoveryEmpresaEmail(nome, token)
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
    }
}