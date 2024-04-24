import { Curso } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { RegisterCursosDTO } from "../../dtos/RegisterCursosDTO";
import { AppError } from "../../../../errors/error";

export class RegisterCursosUseCase {
    async execute({ cursoName, turno, duracao, coordenador } : RegisterCursosDTO):  Promise< Curso >{

        const cursoAlreadyExists = await prisma.curso.findFirst({
            where: {
                name: cursoName,
                turno,
                duracao,
                coordenador
            }
        });

        if (cursoAlreadyExists){
            throw new AppError("Curso já cadastrado!");
        } else {
            const cursoRegister = await prisma.curso.create({
                data: {
                    name: cursoName,
                    turno,
                    duracao,
                    coordenador
                }
            });
    
            if (!cursoRegister){
                throw new AppError("Erro ao cadastrar curso!");
            }
    
            return cursoRegister;
        }
    }
}