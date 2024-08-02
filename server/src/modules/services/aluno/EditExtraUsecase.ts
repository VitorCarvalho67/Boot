import { EditExtracurricularDTO } from '../../interfaces/alunoDTOs';
import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";

export class EditExtracurricularUseCase {
  async execute(data: EditExtracurricularDTO) {
    const { extracurricularId, instituicao, descricao, inicio, fim } = data;
    const alunoId = data.alunoId;

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
      throw new AppError('Você não tem permissão para editar esta atividade extracurricular.');
    }

    if (descricao) {
      const existingExtracurricular = await prisma.extracurricular.findFirst({
        where: {
          alunoId: extracurricular.alunoId,
          descricao,
          extracurricularId: {
            not: extracurricularId,
          },
        },
      });

      if (existingExtracurricular) {
        throw new AppError('Já existe uma atividade extracurricular com esta descrição para este aluno.');
      }
    }

    const updatedExtracurricular = await prisma.extracurricular.update({
      where: { extracurricularId },
      data: {
        instituicao,
        descricao,
        inicio,
        fim,
        updatedAt: new Date(),
      },
    });

    return updatedExtracurricular;
  }
}
