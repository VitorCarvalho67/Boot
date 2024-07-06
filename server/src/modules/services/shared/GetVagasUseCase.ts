import { prisma } from "../../../prisma/client";

export class GetVagasUseCase {
    async execute(){

        const vagas = await prisma.vaga.findMany({
            include:{
                empresa: true,
                curso: true
            }
        });

        return vagas.map(vaga => {
            return {
                titulo: vaga.titulo,
                empresa: vaga.empresa.name,
                curso: vaga.curso.name,
                remuneracao: vaga.remuneracao,
                cargaHoraria: vaga.cargaHoraria
            }
        });
    }
}