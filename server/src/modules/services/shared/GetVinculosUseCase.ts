import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { IdentificadorEnum, GetVinculosDTO } from "../../interfaces/sharedDTOs";
import { encontrarEntidadePeloEmail } from "./helpers/helpers";

export class GetVinculosUseCase {
    async execute({ email, identifier }: GetVinculosDTO) {
        if (!email) {
            throw new AppError("Email necessário.");
        }

        if (!identifier) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const entidade = await encontrarEntidadePeloEmail(email, identifier);

        if (!entidade) {
            throw new AppError(`${identifier.charAt(0).toUpperCase()}${identifier.slice(1).toLowerCase()} não encontrado.`);
        }

        let aceitosData, enviadosData, recebidosData;
        if (identifier === IdentificadorEnum.ALUNO) {
            aceitosData = await prisma.vinculo.findMany({
                where: {
                    alunoId: entidade.id,
                    accepted: true
                },
                include: {
                    professor: true
                }
            });
            enviadosData = await prisma.vinculo.findMany({
                where: {
                    alunoId: entidade.id,
                    accepted: false
                },
                include: {
                    professor: true
                }
            });
            recebidosData = await prisma.vinculo.findMany({
                where: {
                    vinculoComAlunoId: entidade.id,
                    accepted: false
                },
                include: {
                    professor: true
                }
            });
        } else if (identifier === IdentificadorEnum.PROFESSOR) {
            aceitosData = await prisma.vinculo.findMany({
                where: {
                    professorId: entidade.id,
                    accepted: true
                },
                include: {
                    aluno: true
                }
            });
            enviadosData = await prisma.vinculo.findMany({
                where: {
                    professorId: entidade.id,
                    accepted: false
                },
                include: {
                    aluno: true
                }
            });
            recebidosData = await prisma.vinculo.findMany({
                where: {
                    vinculoComProfessorId: entidade.id,
                    accepted: false
                },
                include: {
                    aluno: true
                }
            });
        } else {
            throw new AppError("Identificador inválido.");
        }

        const aceitos = await Promise.all(aceitosData.map(async (aceito: any) => {
            const sender = async () => {
                if (aceito.alunoId) {
                    const aluno = await prisma.aluno.findUnique({ where: { id: aceito.alunoId } });
                    return aluno ? aluno.email : null;
                } else if (aceito.professorId) {
                    const professor = await prisma.professor.findUnique({ where: { id: aceito.professorId } });
                    return professor ? professor.email : null;
                }
            }
            const recipient = async () => {
                if (aceito.vinculoComAlunoId) {
                    const aluno = await prisma.aluno.findUnique({ where: { id: aceito.vinculoComAlunoId } });
                    return aluno ? aluno.email : null;
                } else if (aceito.vinculoComProfessorId) {
                    const professor = await prisma.professor.findUnique({ where: { id: aceito.vinculoComProfessorId } });
                    return professor ? professor.email : null;
                }
            }

            return {
                sender: await sender(),
                recipient: await recipient()
            }
        }));

        const enviados = await Promise.all(enviadosData.map(async (enviado: any) => {
            const sender = async () => {
                if (enviado.alunoId) {
                    const aluno = await prisma.aluno.findUnique({ where: { id: enviado.alunoId } });
                    return aluno ? aluno.email : null;
                } else if (enviado.professorId) {
                    const professor = await prisma.professor.findUnique({ where: { id: enviado.professorId } });
                    return professor ? professor.email : null;
                }
            }
            const recipient = async () => {
                if (enviado.vinculoComAlunoId) {
                    const aluno = await prisma.aluno.findUnique({ where: { id: enviado.vinculoComAlunoId } });
                    return aluno ? aluno.email : null;
                } else if (enviado.vinculoComProfessorId) {
                    const professor = await prisma.professor.findUnique({ where: { id: enviado.vinculoComProfessorId } });
                    return professor ? professor.email : null;
                }
            }

            return {
                sender: await sender(),
                recipient: await recipient(),
                senderIdentifier: (enviado.alunoId) ? "ALUNO" : "PROFESSOR",
                recipientIdentifier: (enviado.vinculoComAlunoId) ? "ALUNO" : "PROFESSOR"
            }
        }));

        const recebidos = await Promise.all(recebidosData.map(async (recebido: any) => {
            const sender = async () => {
                if (recebido.alunoId) {
                    const aluno = await prisma.aluno.findUnique({ where: { id: recebido.alunoId } });
                    return aluno ? aluno.email : null;
                } else if (recebido.professorId) {
                    const professor = await prisma.professor.findUnique({ where: { id: recebido.professorId } });
                    return professor ? professor.email : null;
                }
            }

            const recipient = async () => {
                if (recebido.vinculoComAlunoId) {
                    const aluno = await prisma.aluno.findUnique({ where: { id: recebido.vinculoComAlunoId } });
                    return aluno ? aluno.email : null;
                } else if (recebido.vinculoComProfessorId) {
                    const professor = await prisma.professor.findUnique({ where: { id: recebido.vinculoComProfessorId } });
                    return professor ? professor.email : null;
                }
            }

            return {
                sender: await sender(),
                recipient: await recipient(),
                senderIdentifier: (recebido.alunoId) ? "ALUNO" : "PROFESSOR",
                recipientIdentifier: (recebido.vinculoComAlunoId) ? "ALUNO" : "PROFESSOR"
            }
        }));

        return {
            aceitos,
            enviados,
            recebidos
        };
    }
}
