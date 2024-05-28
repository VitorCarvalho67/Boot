import { Coordenador } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { RegisterCoordenadorDTO } from "../../interfaces/adminDTOs"
import { AppError } from "../../../errors/error";

export class RegisterCoordenadorUseCase {
    async execute({ name }: RegisterCoordenadorDTO): Promise<Pick<Coordenador, "name">> {

        if (!name) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const isProfessor = await prisma.professor.findFirst({
            where: {
                name
            }
        });

        if (isProfessor) {
            const coordenadorAlreadyExists = await prisma.coordenador.findFirst({
                where: {
                    name
                }
            });

            if (!coordenadorAlreadyExists) {
                const coordenadorRegister = await prisma.coordenador.create({
                    data: {
                        name,
                        professorId: isProfessor.id
                    }
                });

                console.log("Break point ⭕");

                if (!coordenadorRegister) {
                    throw new AppError("Erro ao cadastrar professor!");
                } else {
                    return {
                        name: coordenadorRegister.name
                    };
                }
            } else {
                throw new AppError("Coordenador já cadastrado!");
            }
        } else {
            throw new AppError("Esse nome não corresponde a um professor!");
        }
    }
}