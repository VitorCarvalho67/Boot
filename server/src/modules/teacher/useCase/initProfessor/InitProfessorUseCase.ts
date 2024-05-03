import { Professor } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { InitProfessorDTO } from "../../dtos/InitProfessorDTO";
import { AppError } from "../../../../errors/error";

export class InitProfessorUseCase {
    async execute({ email } : InitProfessorDTO): Promise<{ professor: Pick<Professor, 'email' | 'validated'> }>{
        
        if(email == undefined){
            throw new AppError("Professor não encontrado");
        }

        const professor = await prisma.professor.findFirst({
            where: {
                email
            }
        });

        if (!professor){
            throw new AppError("Prrofessor não encontrado");
        }

        return{ 
            professor: {
                email: professor.email,
                validated: professor.validated
            }
        }
    }
}