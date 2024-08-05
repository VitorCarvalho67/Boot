import { prisma } from "../../../../prisma/client";
import { Coordenador } from "@prisma/client";

export class GetCoordenadorUseCase {
    async execute(): Promise<Pick<Coordenador, 'name'>[]> {

        const coordenadores = await prisma.coordenador.findMany({});

        return coordenadores.map(coordenador => {
            return {
                name: coordenador.name
            }
        });
    }
}