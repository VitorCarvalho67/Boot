import { prisma } from "../../../prisma/client";
import { Curso } from "@prisma/client";

export class GetCursosUseCase {
    async execute(): Promise<Pick<Curso, 'name'>[]> {

        const cursos = await prisma.curso.findMany({});

        return cursos.map(curso => {
            return {
                name: curso.name
            }
        });
    }
}