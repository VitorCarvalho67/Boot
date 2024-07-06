import { prisma } from "../../../prisma/client";
import { Empresa } from "@prisma/client";

export class GetEmpresasUseCase {
    async execute(): Promise<Pick<Empresa, 'name' | 'email'>[]> {

        const empresas = await prisma.empresa.findMany({});

        return empresas.map(empresa => {
            return {
                name: empresa.name,
                email: empresa.email
            }
        });
    }
}