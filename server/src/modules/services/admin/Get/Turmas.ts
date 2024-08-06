import { prisma } from "../../../../prisma/client";
import { Aluno, Turma, Curso } from "@prisma/client";

type TurmaComAlunos = Turma & {
    curso: Curso;
    lista_de_alunos: Aluno[];
};

export class GetFullTurmasUseCase {
    async execute(): Promise<TurmaComAlunos[]> {
        const turmas = await prisma.turma.findMany({
            orderBy: {
                curso: {
                    name: 'asc'
                }
            },
            include: {
                curso: true
            }
        });

        const turmasComAlunos: TurmaComAlunos[] = [];
        for (const turma of turmas) {
            const alunos = await prisma.aluno.findMany({
                where: {
                    turmas: {
                        some: {
                            turmaId: turma.id
                        }
                    }
                }
            });
            const turmaComAlunos: TurmaComAlunos = {
                ...turma,
                lista_de_alunos: alunos
            };
            turmasComAlunos.push(turmaComAlunos);
        }

        return turmasComAlunos;
    }
}
