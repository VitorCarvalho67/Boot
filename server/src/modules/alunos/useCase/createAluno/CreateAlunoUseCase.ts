import { Aluno } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateAlunoDTO } from "../../dtos/CreateAlunoDTO";
import { AppError } from "../../../../errors/error";

const bcrypt = require('bcrypt');

export class CreateAlunoUseCase {
    async execute({email, token} : CreateAlunoDTO): Promise<Aluno>{

        const preAluno = await prisma.preAluno.findUnique({
            where: {
                email,
                token
            }
        });

        if (!preAluno){
            throw new AppError("PreAluno não existe");
        }

        const aluno = await prisma.aluno.create({
            data:{
                name: preAluno.name,
                email,
                password: preAluno.password
            }
        });

        // Deletar preAluno
        await prisma.preAluno.delete({
            where: {
                email
            }
        });

        // ir decrementando a quantidade de tentativas validas caso ele encontre o email
        // mas com o token errado

        // deletar caso as tentativas sejam 0 e caso o tempo de validade tenha passado(10min)
        
        return aluno;
    }
}