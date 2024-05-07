import { Professor } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { RegisterProfessorDTO } from "../../interfaces/adminDTOs"
import { AppError } from "../../../errors/error";
import { generateRegisterProfessorEmail } from "../../../mail/templates/registerProfessor";
import transporter from "../../../mail/config/email"; 

const bcrypt = require('bcrypt');

export class RegisterProfessorUseCase{
    async execute({ name, email, tituloPrincipal } : RegisterProfessorDTO):  Promise< Professor >{

        const emailAlreadyExists = await prisma.professor.findFirst({
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

            const nome = name.split(' ').shift()?.toString() ?? 'professor(a)';

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Boot - Credenciais de login do professor',
                html: generateRegisterProfessorEmail(nome, email, password)
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
            
            const professorRegister = await prisma.professor.create({
                data: {
                    name,
                    email,
                    password: hash,
                    tituloPrincipal
                }
            });
    
            if (!professorRegister){
                throw new AppError("Erro ao cadastrar professor!");
            }
    
            return professorRegister;
        }
    }
}