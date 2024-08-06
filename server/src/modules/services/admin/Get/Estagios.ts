import { prisma } from "../../../../prisma/client";
import { Vaga } from "@prisma/client";

export class GetFullEstagiosUseCase {
    async execute(): Promise<Vaga[]> {

        const estagios = await prisma.vaga.findMany({
            include: {
                funcionario: {
                    select: {
                        name: true
                    }
                },
                empresa: true
            }
        });

        return estagios;
    }
}