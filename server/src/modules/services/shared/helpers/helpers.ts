import { EntidadeEnum } from "../../../interfaces/sharedDTOs";
import { prisma } from "../../../../prisma/client";
import path from 'path';
import fs from 'fs/promises';
import { minioClient } from "../../../../minioService";
import { Aluno, Professor } from "@prisma/client";

export const FindEntidade = async (email: string, identifier: EntidadeEnum) => {
    switch (identifier) {
        case EntidadeEnum.ALUNO:
            return prisma.aluno.findUnique({
                where: { email }
            });
        case EntidadeEnum.PROFESSOR:
            return prisma.professor.findUnique({
                where: { email }
            });
        case EntidadeEnum.FUNCIONARIO:
            return prisma.funcionario.findUnique({
                where: { email }
            });
        case EntidadeEnum.EMPRESA:
            return prisma.empresa.findUnique({
                where: { email }
            });
        default:
            return null;
    }
}

export const clearUploads = async () => {
    const uploadDir = __dirname + '../../../../../../uploads';

    try {
        const files = await fs.readdir(uploadDir);
        const deletePromises = files.map(file => fs.unlink(path.join(uploadDir, file)));

        await Promise.all(deletePromises);
        console.log('Todos os arquivos na pasta uploads foram deletados.');
    } catch (error) {
        console.error(`Erro ao limpar a pasta uploads: ${error}`);
    }
};

export const getImgUrl = async (entidade: Professor | Aluno ) => {

    const bucketName = 'boot';
    const imageName = entidade.imagem as string;
    
    let entityUrl = "default";
    
    if (imageName) {
        const objectExists = await minioClient.statObject(bucketName, imageName);
        if(objectExists){
            entityUrl = await minioClient.presignedUrl('GET', bucketName, imageName, 24 * 60 * 60);
        }
    }


    return entityUrl;
}