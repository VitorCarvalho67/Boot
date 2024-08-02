import { ExcludeExtracurricularDTO } from '../../interfaces/alunoDTOs';
import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";

export class ExcludeExtracurricularUseCase {
  async execute(data: ExcludeExtracurricularDTO) {
    const { extracurricularId, alunoId } = data;

    if (!extracurricularId) {
      throw new AppError('ID da atividade extracurricular é obrigatório.');
    }

    if (!alunoId) {
      throw new AppError('ID do aluno é obrigatório.');
    }

    const extracurricular = await prisma.extracurricular.findUnique({
      where: { extracurricularId },
    });

    if (!extracurricular) {
      throw new AppError('Atividade extracurricular não encontrada.');
    }

    if (extracurricular.alunoId !== alunoId) {
      throw new AppError('Você não tem permissão para excluir esta atividade extracurricular.');
    }

    await prisma.extracurricular.delete({
      where: { extracurricularId },
    });

    return { message: 'Atividade extracurricular excluída com sucesso.' };
  }
}
