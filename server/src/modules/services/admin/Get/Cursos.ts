import { prisma } from "../../../../prisma/client";
import { Curso } from "@prisma/client";

export class GetFullCursosUseCase {
    async execute(): Promise<Curso[]> {

        const cursos = await prisma.curso.findMany({});

        return cursos;
    }
}