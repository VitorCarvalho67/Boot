import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/error";
import { Coordenador } from "@prisma/client";

export class GetCoordenadoresNamesUseCase {
    async execute(): Promise<Pick<Coordenador, 'name'>[]> {

        const coordenadores = await prisma.coordenador.findMany({});

        return coordenadores.map(coordenador => {
            return {
                name: coordenador.name
            }
        });
    }
}