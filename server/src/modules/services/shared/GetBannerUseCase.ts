import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { EntidadeEnum, GetEntidadeDTO } from "../../interfaces/sharedDTOs";
import { FindEntidade } from "./helpers/helpers";
import { minioClient } from '../../../minioService';
import fs from "fs";
import path from "path";

interface EntidadeComBanner {
    banner: string | null;
}

export class GetBannerUseCase {
    async execute({ email, identifier } : GetEntidadeDTO) {

        if (!identifier || !email) {
            throw new AppError("Parâmetros insufientes ou inválidos.");
        }

        const entidade = await FindEntidade(email, EntidadeEnum[identifier]);

        if (!entidade) {
            throw new AppError(`${identifier.charAt(0).toUpperCase()}${identifier.slice(1).toLowerCase()} não encontrado.`);
        }

        const bucketName = 'boot';

        const entidadeComBanner = entidade as EntidadeComBanner;

        if(entidadeComBanner){
            const imageName = entidadeComBanner.banner as string;
            
            const objectExists = await minioClient.statObject(bucketName, imageName);
    
            if (!objectExists) {
                throw new Error('banner não encontrada');
            }
    
            const url = await minioClient.presignedUrl('GET', bucketName, imageName, 24 * 60 * 60);
    
            return {
                url: url
            };
        }

    }
}