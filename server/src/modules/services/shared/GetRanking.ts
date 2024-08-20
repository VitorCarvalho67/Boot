import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";

const notaValores: { [key: string]: number } = {
  MB: 10,
  B: 7.5,
  R: 5,
  I: 2.5
};

export class GetRankingUseCase {
  async execute() {
    const notas = await prisma.nota.findMany({
      include: {
        aluno: true
      }
    });

    if (!notas.length) {
      throw new AppError("Nenhuma nota encontrada.");
    }

    const alunoNotas: { [alunoId: string]: { totalNotas: number; numeroNotas: number } } = {};

    notas.forEach(nota => {
      const alunoId = nota.alunoId;
      const valorNota = notaValores[nota.mencao];

      if (!alunoNotas[alunoId]) {
        alunoNotas[alunoId] = {
          totalNotas: 0,
          numeroNotas: 0
        };
      }

      alunoNotas[alunoId].totalNotas += valorNota;
      alunoNotas[alunoId].numeroNotas += 1;
    });

    const ranking = Object.keys(alunoNotas).map(alunoId => {
      const { totalNotas, numeroNotas } = alunoNotas[alunoId];
      const notaMaximaPossivel = 10 * numeroNotas;
      const rankingNota = totalNotas / notaMaximaPossivel;

      return {
        alunoId,
        rankingNota
      };
    });

    ranking.sort((a, b) => b.rankingNota - a.rankingNota);

    const alunos = await prisma.aluno.findMany({
      where: {
        id: {
          in: ranking.map(r => r.alunoId)
        }
      }
    });

    const rankingDetalhado = ranking.map(rank => {
      const aluno = alunos.find(a => a.id === rank.alunoId);
      return {
        aluno,
        rankingNota: rank.rankingNota
      };
    });

    return rankingDetalhado;
  }
}
