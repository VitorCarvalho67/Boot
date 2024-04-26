import { Professor } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { RegisterProfessorDTO } from "../../dtos/RegisterProfessorDTO";
import { AppError } from "../../../../errors/error";

export class RegisterProfessorUseCase{
    async execute({ name, email, password, tituloPrincipal } : RegisterProfessorDTO):  Promise< Professor >{

        const emailAlreadyExists = await prisma.professor.findFirst({
            where: {
                email
            }
        });

        if (emailAlreadyExists){
            throw new AppError("Email já cadastrado!");
        } else {
            const professorRegister = await prisma.professor.create({
                data: {
                    name,
                    email,
                    password,
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