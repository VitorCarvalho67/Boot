import { Empresa } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { RegisterEmpresaDTO } from "../../interfaces/empresaDTOs"
import { AppError } from "../../../errors/error";
import { generateRegisterEmpresaEmail } from "../../../mail/templates/registerEmpresa";
import transporter from "../../../mail/config/email";

const bcrypt = require('bcrypt');

export class RegisterEmpresaUseCase {
    async execute({ name, email, cnpj, password }: RegisterEmpresaDTO): Promise<Pick<Empresa, 'name' | 'email' | 'cnpj'>> {

        if (cnpj.length !== 14) {
            throw new AppError("O CNPJ deve conter exatamente 14 dígitos.");
        }

        const cnpjFormated = `${cnpj.substr(0, 2)}.${cnpj.substr(2, 3)}.${cnpj.substr(5, 3)}/${cnpj.substr(8, 4)}-${cnpj.substr(12, 2)}`;

        const emailAlreadyExists = await prisma.empresa.findFirst({
            where: {
                email
            }
        });

        if (emailAlreadyExists) {
            throw new AppError("Email já cadastrado!");
        } else {
            const cnpjAlreadyExists = await prisma.empresa.findFirst({
                where: {
                    cnpj
                }
            });

            if (cnpjAlreadyExists) {
                throw new AppError("CNPJ já cadastrado!");
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);

                const nome = name.split(' ').shift()?.toString() ?? 'empresa';

                const token = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
                const tokenHash = bcrypt.hashSync(token, salt);

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Boot - Código de verificação',
                    html: generateRegisterEmpresaEmail(nome, cnpjFormated, token)
                };

                var emailEnviado = false;

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        throw new AppError("Erro ao enviar email: " + error);
                    } else {
                        console.log('E-mail enviado:', info.response);
                        emailEnviado = true
                    }
                });

                console.log(name, email, cnpj, hash, tokenHash);
                
                const empresaRegister = await prisma.empresa.create({
                    data: {
                        name,
                        email,
                        cnpj,
                        password: hash,
                        token: tokenHash
                    }
                });

                if (!empresaRegister) {
                    throw new AppError("Erro ao cadastrar empresa!");
                }

                return empresaRegister;
            }
        }
    }
}