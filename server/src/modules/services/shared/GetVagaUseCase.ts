import { AppError } from "../../../errors/error";
import { prisma } from "../../../prisma/client";

export class GetVagaUseCase {
    async execute(id: string){

        const vaga = await prisma.vaga.findUnique({
            where:{
                id: id
            },
            include:{
                curso: true,
                empresa: true,
            }
        });

        if(!vaga){
            throw new AppError("Vaga não encontrada");
        }

        return {
            vaga:{
                id: vaga.id,
                titulo: vaga.titulo,
                empresa: {
                    cnpj: vaga.empresa.cnpj,
                    name: vaga.empresa.name
                },
                curso: vaga.curso.name,
                remuneracao: vaga.remuneracao,
                cargaHoraria: vaga.cargaHoraria,
                requisitos: vaga.requisitos,
                beneficios: vaga.beneficios,
                entrada: vaga.entrada,
                saida: vaga.saida,
                status: vaga.status,
                descricao: vaga.descricao
            }
        };
    }
}