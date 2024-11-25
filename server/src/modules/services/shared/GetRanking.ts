import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { minioClient } from "../../../minioService";

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

    const ranking = Object.keys(alunoNotas).map((alunoId) => {
      const { totalNotas, numeroNotas } = alunoNotas[alunoId];
      const notaMaximaPossivel = 10 * numeroNotas;
      const rankingNota = totalNotas / notaMaximaPossivel;

      return {
        alunoId,
        rankingNota,
        peso: rankingNota * numeroNotas,
        numeroNotas,
      };
    });

    ranking.sort((a, b) => b.peso - a.peso);

    const alunos = await prisma.aluno.findMany({
      where: {
        id: {
          in: ranking.map((r) => r.alunoId),
        },
      },
    });

    const rankingDetalhado = await Promise.all(
      ranking.map(async (rank) => {
        const aluno = alunos.find((a) => a.id === rank.alunoId);
        if (aluno) {
          const bucketName = "boot";
          const imageName = aluno.imagem;

          let entityUrl = "default";

          if (imageName) {
            try {
              await minioClient.statObject(bucketName, imageName);
              entityUrl = await minioClient.presignedUrl(
                "GET",
                bucketName,
                imageName,
                24 * 60 * 60
              );
            } catch (error) {
              console.error(`Erro ao verificar objeto ${imageName}:`, error);
            }
          }

          console.log("+++++++++\n\n\n\n" + rank.numeroNotas);

          return {
            aluno: {
              nome: aluno.name,
              rm: aluno.rm,
              imagem: entityUrl,
            },
            rankingNota: rank.rankingNota,
            numeroNotas: rank.numeroNotas,
          };
        }

        return null;
      })
    );

    return rankingDetalhado;
  }
}
