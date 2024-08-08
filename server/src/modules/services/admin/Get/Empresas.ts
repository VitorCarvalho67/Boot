import { prisma } from "../../../../prisma/client";

interface EmpresaWithEstagios {
  id: string;
  name: string;
  estagios: string[];
}

export class GetEmpresasWithEstagiosUseCase {
  async execute(): Promise<EmpresaWithEstagios[]> {
    const empresas = await prisma.empresa.findMany({
      include: {
        vaga: true,
      },
    });

    const empresasWithEstagios: EmpresaWithEstagios[] = empresas.map((empresa) => ({
      ...empresa,
      estagios: empresa.vaga.map((vaga) => vaga.titulo),
    }));

    return empresasWithEstagios;
  }
}
