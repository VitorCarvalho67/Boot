import { prisma } from "../../../../prisma/client";

interface CursoWithSummary {
  id: string;
  name: string;
  turno: string;
  duracao: string;
  coordenador: string;
  quantidadeTurmas: number;
  quantidadeAlunos: number;
}

export class GetFullCursosUseCase {
  async execute(): Promise<CursoWithSummary[]> {
    const cursos = await prisma.curso.findMany({
      include: {
        coordenador: true,
      },
    });

    const cursosWithSummary: CursoWithSummary[] = [];

    for (const curso of cursos) {
      const turmas = await prisma.turma.findMany({
        where: { cursoId: curso.id },
        include: {
          alunos: {
            include: {
              aluno: true,
            },
          },
        },
      });

      const quantidadeTurmas = turmas.length;
      const quantidadeAlunos = turmas.reduce((acc, turma) => acc + turma.alunos.length, 0);

      cursosWithSummary.push({
        id: curso.id,
        name: curso.name,
        turno: curso.turno,
        duracao: curso.duracao,
        coordenador: curso.coordenador.name,
        quantidadeTurmas,
        quantidadeAlunos,
      });
    }

    return cursosWithSummary;
  }
}
