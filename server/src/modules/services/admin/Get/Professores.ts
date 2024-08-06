import { prisma } from "../../../../prisma/client";
import { Professor } from "@prisma/client";

export class GetProfessoresUseCase {
    async execute(): Promise<Professor[]> {

        const professores = await prisma.professor.findMany({});

        return professores;
    }
}