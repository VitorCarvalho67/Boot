import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { Curso } from "@prisma/client";

export class GetCursosUseCase {
    async execute(): Promise<Pick<Curso, 'name'>[]> {

        const curso = await prisma.curso.findMany({});

        return curso.map(curso => {
            return {
                name: curso.name
            }
        });
    }
}