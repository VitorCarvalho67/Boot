import { Cargo, Funcionario } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { RegisterFuncionarioDTO } from "../../interfaces/adminDTOs"
import { AppError } from "../../../errors/error";
import { generateRegisterFuncionarioEmail } from "../../../mail/templates/registerFuncionario";
import transporter from "../../../mail/config/email"; 

const bcrypt = require('bcrypt');

export class RegisterFuncionarioUseCase{
    async execute({ name, email, cargo } : RegisterFuncionarioDTO):  Promise< Funcionario >{

        const emailAlreadyExists = await prisma.funcionario.findFirst({
            where: {
                email
            }
        });

        if (emailAlreadyExists){
            throw new AppError("Email já cadastrado!");
        } else {
            const salt = bcrypt.genSaltSync(10);
            const password: string = Array(8).fill(0).map(() => Math.random().toString(36).charAt(2)).join('').toUpperCase();
            const hash = bcrypt.hashSync(password, salt);

            const nome = name.split(' ').shift()?.toString() ?? 'profissional de ' + cargo.toLowerCase();

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Boot - Credenciais de login do profissional',
                html: generateRegisterFuncionarioEmail(nome, email, password, cargo.toLowerCase())
            };

            var emailEnviado = false;

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    throw new AppError("Erro ao enviar email: " + error);
                } else {
                    console.log('E-mail enviado:', info.response);
                    emailEnviado = true
                }
            });
            
            const funcionarioRegister = await prisma.funcionario.create({
                data: {
                    name,
                    email,
                    password: hash,
                    cargo: cargo
                }
            });
    
            if (!funcionarioRegister){
                throw new AppError("Erro ao cadastrar funcionário!");
            }
    
            return funcionarioRegister;
        }
    }
}