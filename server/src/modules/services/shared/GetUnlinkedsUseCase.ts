import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { IdentificadorEnum, GetEntidadeDTO, EntidadeEnum } from "../../interfaces/sharedDTOs";
import { FindEntidade } from "./helpers/helpers";

export class GetUnlinkedsUseCase {
    async execute({ email, identifier }: GetEntidadeDTO) {
        if (!email) {
            throw new AppError("Email necessário.");
        }

        if (!identifier) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const entidade = await FindEntidade(email, EntidadeEnum[identifier]);

        if (!entidade) {
            throw new AppError(`${identifier.charAt(0).toUpperCase()}${identifier.slice(1).toLowerCase()} não encontrado.`);
        }

        let todosVinculos;
        todosVinculos = await prisma.vinculo.findMany({
            where: {
                OR: [
                    { alunoId: entidade.id },
                    { vinculoComAlunoId: entidade.id }
                ]
            },
            include: {
                professor: true
            }
        });

        const professoresVinculadosIds = todosVinculos
            .map(vinculo => vinculo.professorId)
            .filter((id): id is string => id !== null);

        const professoresVinculosIds = todosVinculos
            .map(vinculo => vinculo.vinculoComProfessorId)
            .filter((id): id is string => id !== null);

        const professoresNaoVinculados = await prisma.professor.findMany({
            where: {
                AND: [
                    {
                        id: {
                            notIn: professoresVinculadosIds
                        }
                    },
                    {
                        id: {
                            notIn: professoresVinculosIds
                        }
                    }
                ]
            }
        });

        const professores = professoresNaoVinculados.map(professor => ({
            email: professor.email,
            identifier: IdentificadorEnum.PROFESSOR
        }));

        todosVinculos = await prisma.vinculo.findMany({
            where: {
                OR: [
                    { professorId: entidade.id },
                    { vinculoComProfessorId: entidade.id }
                ]
            },
            include: {
                aluno: true
            }
        });

        const alunosVinculadosIds = todosVinculos
            .map(vinculo => vinculo.alunoId)
            .filter((id): id is string => id !== null);

        const alunosVinculosIds = todosVinculos
            .map(vinculo => vinculo.vinculoComAlunoId)
            .filter((id): id is string => id !== null);

        const alunosNaoVinculados = await prisma.aluno.findMany({
            where: {
                AND: [
                    {
                        id: {
                            notIn: alunosVinculadosIds
                        }
                    },
                    {
                        id: {
                            notIn: alunosVinculosIds
                        }
                    }
                ]
            }
        });

        const alunos = alunosNaoVinculados.map(aluno => ({
            email: aluno.email,
            identifier: IdentificadorEnum.ALUNO
        }));

        return {
            alunosSemVinculo: alunos,
            professoresSemVinculo: professores
        };
    }
}