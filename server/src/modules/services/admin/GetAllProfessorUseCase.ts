import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { Professor } from "@prisma/client";
import { Coordenador } from "@prisma/client";

export class GetAllProfessorUseCase {
    async execute(): Promise<Pick<Professor, 'name'>[]> {

        const professores = await prisma.professor.findMany({
            where: {
                coordenador: {
                    none: {}
                }
            }
        });

        return professores.map(professor => {
            return {
                name: professor.name
            }
        });
    }
}