import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { minioClient } from "../../../minioService";

export class GetEmpresaUseCase {
    async execute(email : string) {
        if (!email) {
            throw new AppError("Parâmetros insufientes ou inválidos.");
        }

        const empresa = await prisma.empresa.findFirst({
            where: {
                email
            },
        });

        if(empresa){
            const bucketName = 'boot';
            const imageName = empresa.imagem as string;
        
            let entityUrl = "default";
            
            if (imageName) {
                const objectExists = await minioClient.statObject(bucketName, imageName);
                if(objectExists){
                    entityUrl = await minioClient.presignedUrl('GET', bucketName, imageName, 24 * 60 * 60);
                }
            }

            const bannerName = empresa.banner as string;
        
            let bannerUrl = "default";
            
            if (bannerName) {
                const objectExists = await minioClient.statObject(bucketName, bannerName);
                if(objectExists){
                    bannerUrl = await minioClient.presignedUrl('GET', bucketName, bannerName, 24 * 60 * 60);
                }
            }
    
            if (!empresa) {
                throw new AppError("Aluno não encontrado.");
            }
    
            return {
                email: empresa.email,
                nome: empresa.name,
                telefone: empresa.telefone,
                endereco: empresa.endereco,
                imagem: entityUrl,
                banner: bannerUrl,
                site: empresa.site,
                patrocinada: empresa.patrocinador,
                cnpj: empresa.cnpj,
            };
        }
    }
}