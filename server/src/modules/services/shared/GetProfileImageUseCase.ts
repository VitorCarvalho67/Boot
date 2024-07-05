import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { EntidadeEnum, GetEntidadeDTO } from "../../interfaces/sharedDTOs";
import { FindEntidade, getImgUrl } from "./helpers/helpers";
import { minioClient } from '../../../minioService';

export class GetProfileImageUseCase {
    async execute({ email, identifier } : GetEntidadeDTO) {
        console.log(email);
        if (!email) {
            throw new AppError("Campo 'email' é necessário. aaaa");
        }

        if (!identifier) {
            throw new AppError("Campo 'identifier' é necessário.");
        }

        const entidade = await FindEntidade(email, EntidadeEnum[identifier]);

        if (!entidade) {
            throw new AppError(`${identifier.charAt(0).toUpperCase()}${identifier.slice(1).toLowerCase()} não encontrado.`);
        }

        const bucketName = 'boot';
        const imageName = entidade.imagem as string;
    
        let entityUrl = "default";
        
        if (imageName) {
            const objectExists = await minioClient.statObject(bucketName, imageName);
            if(objectExists){
                entityUrl = await minioClient.presignedUrl('GET', bucketName, imageName, 24 * 60 * 60);
            }
        }

        return {
            url: entityUrl
        };
    }
}