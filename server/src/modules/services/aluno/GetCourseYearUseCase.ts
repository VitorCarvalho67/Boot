import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { GetTurmasByCursoDTO } from "../../interfaces/alunoDTOs"

export class GetTurmasByCursoUseCase {
    async execute({ curso, turno }: GetTurmasByCursoDTO) {
        if (!curso || !turno) {
            throw new AppError("Parâmetros insufientes ou inválidos. " + curso + " " + turno);
        }

        const cursoExists = await prisma.curso.findFirst({
            where: {
                name: curso,
                turno: turno
            },
        });

        if (!cursoExists) {
            throw new AppError("Curso não encontrado.");
        }

        const turmas = await prisma.turma.findMany({
            where: {
                cursoId: cursoExists.id
            },
        });

        if (!turmas) {
            throw new AppError("Turmas não encontradas para esse curso.");
        }

        return turmas.map(turma => ({
            inicio: turma.inicio
        }));
    }
}