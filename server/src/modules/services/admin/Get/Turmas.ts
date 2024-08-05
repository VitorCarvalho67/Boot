import { prisma } from "../../../../prisma/client";
import { Turma } from "@prisma/client";

export class GetFullTurmasUseCase {
    async execute(): Promise<Turma[]> {

        const turmas = await prisma.turma.findMany({});

        return turmas;
    }
}