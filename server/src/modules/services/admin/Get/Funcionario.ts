import { prisma } from "../../../../prisma/client";
import { Funcionario } from "@prisma/client";

export class GetFullFuncionariosUseCase {
    async execute(): Promise<Funcionario[]> {

        const funcionarios = await prisma.funcionario.findMany({});

        return funcionarios;
    }
}