import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";

export class GetBoletinsEmAnaliseUseCase {
    async execute() {
        const boletins = await prisma.boletim.findMany({
            where: {
                status: 'EM_ANALISE',
            },
            include: {
                aluno: {
                    include: {
                        turmas: {
                            include: {
                                turma: true,
                            }
                        }
                    }
                }
            },
            orderBy: [
                {
                    aluno: {
                        name: 'asc'
                    }
                }
            ]
        });

        if (!boletins.length) {
            throw new AppError('Nenhum boletim em análise encontrado.');
        }

        const boletinsEmAnalise = boletins.map(boletim => ({
            id: boletim.id,
            aluno: {
                id: boletim.aluno.id,
                name: boletim.aluno.name,
                turma: boletim.aluno.turmas.map(turma => turma.turma.inicio).join(', ')
            },
            url: boletim.link,
            status: boletim.status
        }));

        return boletinsEmAnalise;
    }
}
