import fs from 'fs';
import path from 'path';
import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { CompareBoletimDTO } from '../../interfaces/funcionarioDTOs';
import { downloadFromMinio } from "../../../minioService";
import { clearUploads } from '../shared/helpers/helpers';

export class CompareBoletimUseCase {
    async execute({ boletimId, file }: CompareBoletimDTO) {
        if (!boletimId) {
            throw new AppError('ID do boletim não fornecido.');
        }

        if (!file || !file.path) {
            throw new AppError('Arquivo do boletim não fornecido.');
        }

        
        const boletim = await prisma.boletim.findUnique({
            where: {
                id: boletimId,
            },
        });
        
        if (!boletim) {
            throw new AppError('Boletim não encontrado.');
        }
        
        const filePath = path.resolve(file.path);
        const fileBuffer = fs.readFileSync(filePath);
        
        const storedBoletimBuffer = await downloadFromMinio('boot', boletim.caminho);
        console.log("here");

        const isEqual = fileBuffer.equals(storedBoletimBuffer);

        const novoStatus = isEqual ? 'APROVADO' : 'RECUSADO';

        await prisma.boletim.update({
            where: { id: boletimId },
            data: { status: novoStatus }
        });

        await clearUploads();

        return { message: `Boletim ${novoStatus}.` };
    }
}
