import { Aluno } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateAlunoDTO } from "../../dtos/CreateAlunoDTO";
import { AppError } from "../../../../errors/error";

const bcrypt = require('bcrypt');

export class CreateAlunoUseCase {
    async execute({name, email, password} : CreateAlunoDTO): Promise<Aluno>{
       
        // verificar se o email já existe
        const alunoAlreadyExists = await prisma.aluno.findUnique({
            where: {
                email
            }
        });
        
        if (alunoAlreadyExists){
            throw new AppError("Aluno already exists");
        }

        // Criar usuário
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt); 

        const aluno = await prisma.aluno.create({
            data:{
                name,
                email,
                password: hash
            }
        });
     
        return aluno;
    }
}