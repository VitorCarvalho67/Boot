import { PreAluno } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreatePreAlunoDTO } from "../../dtos/CreatePreAlunoDTO";
import { AppError } from "../../../../errors/error";
import { generateRegisterEmail } from "../../../../mail/templates/register";
import transporter from "../../../../mail/config/email"; 
import nodemailer from 'nodemailer';

const bcrypt = require('bcrypt');

export class CreatePreAlunoUseCase {
    async execute({name, email, password} : CreatePreAlunoDTO): Promise<PreAluno>{
        if (name && email && password && name.trim() !== "" && email.trim() !== "" && password.trim() !== ""){
            const alunoAlreadyExists = await prisma.aluno.findUnique({
                where: {
                    email
                }
            });
            const preAlunoAlreadyExists = await prisma.preAluno.findUnique({
                where: {
                    email
                }
            });
            
            if (alunoAlreadyExists || preAlunoAlreadyExists){
                throw new AppError("Aluno already exists");
            } 
            
            else {
                const dominio_cps = "@etec.sp.gov.br";
        
                if (!email.includes(dominio_cps)){
                    throw new AppError("Email inválido");
                }
                
                else{
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(password, salt);
            
                    const token = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
                    const tokenHash = bcrypt.hashSync(token, salt);

                    const PreAluno = await prisma.preAluno.create({
                        data:{
                            name: name.trim(),
                            email,
                            password: hash,
                            token: tokenHash
                        }
                    });
                    
                    const nome = name.split(' ').shift()?.toString() ?? 'aluno';
    
                    const mailOptions = {
                        from: process.env.EMAIL,
                        to: email,
                        subject: 'Boot - Código de verificação',
                        html: generateRegisterEmail(nome, token)
                    };
    
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            throw new AppError("Erro ao enviar email: " + error);
                        } else {
                            console.log('E-mail enviado:', info.response);
                        }
                    });
                 
                    return PreAluno;
                }
            }
        } else{
            throw new AppError("Parâmetros inválidos!");
        }
    }
}