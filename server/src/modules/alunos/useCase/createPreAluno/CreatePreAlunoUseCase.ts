import { PreAluno } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreatePreAlunoDTO } from "../../dtos/CreatePreAlunoDTO";
import { AppError } from "../../../../errors/error";

const bcrypt = require('bcrypt');

export class CreatePreAlunoUseCase {
    async execute({name, email, password} : CreatePreAlunoDTO): Promise<PreAluno>{
       
        // verificar se o email já existe na aluno e na preAluno
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

        // Criar usuário
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // Gerar token com 6 dígitos
        const token = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');

        const PreAluno = await prisma.preAluno.create({
            data:{
                name,
                email,
                password: hash,
                token
            }
        });
     
        return PreAluno;
    }
}