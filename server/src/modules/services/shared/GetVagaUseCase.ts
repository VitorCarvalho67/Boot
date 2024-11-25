import { AppError } from "../../../errors/error";
import { minioClient } from "../../../minioService";
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

        const bucketName = 'boot';
        const imageName = vaga.empresa.imagem as string;
    
        let entityUrl = "default";
        
        if (imageName) {
            const objectExists = await minioClient.statObject(bucketName, imageName);
            if(objectExists){
                entityUrl = await minioClient.presignedUrl('GET', bucketName, imageName, 24 * 60 * 60);
            }
        }

        return {
            vaga:{
                id: vaga.id,
                titulo: vaga.titulo,
                empresa: {
                    cnpj: vaga.empresa.cnpj,
                    email: vaga.empresa.email,
                    name: vaga.empresa.name,
                    entityUrl: entityUrl
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