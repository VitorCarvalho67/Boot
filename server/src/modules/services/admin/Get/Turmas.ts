import { prisma } from "../../../../prisma/client";
import { Aluno, Turma } from "@prisma/client";

export class GetFullTurmasUseCase {
    async execute(): Promise<(Turma & { alunos: { aluno: Aluno }[] })[]> {
        const turmas = await prisma.turma.findMany({
            include: {
                curso: true,
                alunos: {
                    include: {
                        aluno: true
                    }
                }
            }
        });

        return turmas;
    }
}
