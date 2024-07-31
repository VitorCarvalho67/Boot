import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { RelateAlunoAtividadeDTO } from "../../interfaces/professorDTOs";

export class RelateAlunoAtividadeUseCase {
  async execute({ alunoId, atividadeId, professorId, mencao }: RelateAlunoAtividadeDTO) {
    if (!alunoId || !atividadeId || !professorId || !mencao) {
      throw new AppError("Parâmetros insuficientes ou inválidos.");
    }

    const atividade = await prisma.atividade.findUnique({
      where: { id: atividadeId }
    });

    if (!atividade) {
      throw new AppError("Atividade não encontrada.");
    }

    const professor = await prisma.professor.findUnique({
      where: { id: professorId }
    });

    if (!professor) {
      throw new AppError("Professor não encontrado.");
    }

    if(atividade.professorId != professorId){
      throw new AppError("Professor inválido.");
    }

    const aluno = await prisma.aluno.findUnique({
      where: { id: alunoId }
    });

    if (!aluno) {
      throw new AppError("Aluno não encontrado.");
    }

    try {
      await prisma.alunoAtividade.create({
        data: {
          alunoId,
          atividadeId,
          mencao
        }
      });

      return "Aluno relacionado à atividade com sucesso.";
    } catch (error) {
      throw new AppError(`Erro ao relacionar aluno à atividade: ${error}`);
    }
  }
}
