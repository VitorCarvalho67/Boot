import { Curso } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { RegisterCursosDTO } from "../../interfaces/adminDTOs"
import { AppError } from "../../../errors/error";

export class RegisterCursosUseCase {
    async execute({ cursoName, turno, duracao, coordenador }: RegisterCursosDTO): Promise<Pick<Curso, "name" | "turno" | "duracao">> {

        const coordenadorExists = await prisma.coordenador.findFirst({
            where: {
                name: coordenador
            }
        });

        if (!coordenadorExists) {
            throw new AppError("Coordenador inválido!")
        } else {

            const cursoAlreadyExists = await prisma.curso.findFirst({
                where: {
                    name: cursoName,
                    turno,
                    duracao,
                    coordenadorId: coordenadorExists.id
                }
            });

            if (cursoAlreadyExists) {
                throw new AppError("Curso já cadastrado!");
            } else {
                const cursoRegister = await prisma.curso.create({
                    data: {
                        name: cursoName,
                        turno,
                        duracao,
                        coordenadorId: coordenadorExists.id
                    }
                });

                if (!cursoRegister) {
                    throw new AppError("Erro ao cadastrar curso!");
                }

                return {
                    name: cursoRegister.name,
                    turno: cursoRegister.turno,
                    duracao: cursoRegister.duracao
                };
            }
        }
    }
}