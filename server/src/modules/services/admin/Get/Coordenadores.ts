import { prisma } from "../../../../prisma/client";
import { Coordenador, Curso } from "@prisma/client";

export class GetCoordenadorUseCase {
    async execute(): Promise<(Coordenador & { cursos: Curso[] })[]> {

        const coordenadores = await prisma.coordenador.findMany({
            include: {
                curso: true,
            },
        });

        const coordenadoresComCursos = coordenadores.map(coordenador => ({
            ...coordenador,
            cursos: coordenador.curso
        }));

        return coordenadoresComCursos;
    }
}
