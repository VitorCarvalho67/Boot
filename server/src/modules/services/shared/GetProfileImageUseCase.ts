import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { GetEntidadeDTO } from "../../interfaces/sharedDTOs";
import { FindEntidade } from "./helpers/helpers";
import { minioClient } from '../../../minioService';
import fs from "fs";
import path from "path";

export class GetProfileImageUseCase {
    async execute({ email, identifier } : GetEntidadeDTO) {

        if (!identifier || !email) {
            throw new AppError("Parâmentros insufientes ou inválidos.");
        }

        const entidade = await FindEntidade(email, identifier);

        if (!entidade) {
            throw new AppError(`${identifier.charAt(0).toUpperCase()}${identifier.slice(1).toLowerCase()} não encontrado.`);
        }

        const bucketName = 'boot';

        const imageName = entidade.imagem as string;

        const objectExists = await minioClient.statObject(bucketName, imageName);

        if (!objectExists) {
            throw new Error('Imagem não encontrada');
        }

        const url = await minioClient.presignedUrl('GET', bucketName, imageName, 24 * 60 * 60);

        return {
            url: url
        };
    }
}