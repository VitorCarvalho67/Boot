import { IdentificadorEnum } from "../../../interfaces/sharedDTOs";
import { prisma } from "../../../../prisma/client";
import path from 'path';
import fs from 'fs/promises';

export const FindEntidade = async (email: string, identifier: IdentificadorEnum) => {
    switch (identifier) {
        case IdentificadorEnum.ALUNO:
            return prisma.aluno.findUnique({
                where: { email }
            });
        case IdentificadorEnum.PROFESSOR:
            return prisma.professor.findUnique({
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
