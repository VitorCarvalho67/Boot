import { RegisterExtracurricularDTO } from '../../interfaces/alunoDTOs';
import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";

export class RegisterExtracurricularUseCase {
  async execute(data: RegisterExtracurricularDTO) {
    const { alunoId, instituicao, descricao, inicio, fim } = data;

    if (!alunoId || !instituicao || !descricao || !inicio || !fim) {
      throw new AppError('Todos os campos são obrigatórios.');
    }

    if (new Date(inicio) >= new Date(fim)) {
      throw new AppError('A data de início deve ser anterior à data de fim.');
    }

    const aluno = await prisma.aluno.findUnique({
      where: { id: alunoId },
    });

    if (!aluno) {
      throw new AppError('Aluno não encontrado.');
    }

    const existingExtracurricular = await prisma.extracurricular.findFirst({
      where: {
        alunoId,
        descricao,
      },
    });

    if (existingExtracurricular) {
      throw new AppError('Já existe uma atividade extracurricular com esta descrição para este aluno.');
    }

    const extracurricular = await prisma.extracurricular.create({
      data: {
        alunoId,
        instituicao,
        descricao,
        inicio,
        fim,
      },
    });

    return extracurricular;
  }
}
