import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { CompareBoletimDTO } from '../../interfaces/funcionarioDTOs';
import { clearUploads } from '../shared/helpers/helpers';
import { minioClient } from '../../../minioService';

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

        const bucketName = 'boot';
        const objectName = boletim.caminho;

        let storedFileBuffer: Buffer;
        try {
            storedFileBuffer = await this.getFileFromMinio(bucketName, objectName);
        } catch (error) {
            throw new AppError(`Erro ao baixar o arquivo do MinIO: ${error}`);
        }

        const storedFileText = await this.extractTextFromPdf(storedFileBuffer);

        const filePath = path.resolve(file.path);
        const uploadedFileBuffer = fs.readFileSync(filePath);
        const uploadedFileText = await this.extractTextFromPdf(uploadedFileBuffer);

        const isEqual = storedFileText === uploadedFileText;

        const novoStatus = isEqual ? 'APROVADO' : 'RECUSADO';

        await prisma.boletim.update({
            where: { id: boletimId },
            data: { status: novoStatus }
        });

        await clearUploads();

        return { message: `Boletim ${novoStatus}.` };
    }

    async getFileFromMinio(bucketName: string, objectName: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            minioClient.getObject(bucketName, objectName, (error: Error | null, dataStream: any) => {
                if (error) {
                    return reject(error);
                }

                const chunks: Buffer[] = [];
                dataStream.on('data', (chunk: Buffer) => {
                    chunks.push(chunk);
                });
                dataStream.on('end', () => {
                    resolve(Buffer.concat(chunks));
                });
                dataStream.on('error', (err: Error) => {
                    reject(err);
                });
            });
        });
    }

    async extractTextFromPdf(buffer: Buffer): Promise<string> {
        try {
            const data = await pdf(buffer);
            return data.text;
        } catch (error) {
            throw new AppError(`Erro ao extrair texto do PDF: ${error}`);
        }
    }
}
