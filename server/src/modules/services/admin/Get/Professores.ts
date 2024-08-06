import { prisma } from "../../../../prisma/client";
import { Professor } from "@prisma/client";

export class GetProfessoresUseCase {
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