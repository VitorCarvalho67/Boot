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

        console.log(uploadedFileText);

        const novoStatus = isEqual ? 'APROVADO' : 'RECUSADO';

        // await prisma.boletim.update({
        //     where: { id: boletimId },
        //     data: { status: novoStatus }
        // });

        if(isEqual){
            const relevantText = this.extractRelevantText(storedFileText);

            const materias = this.extractMateriasAndNotas(relevantText);

            console.log(materias);
        }

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

    private extractRelevantText(text: string): string {
        const start = text.indexOf("Resultado Final porComponente");
        const end = text.indexOf("Assiduidade Parcial");

        if (start === -1 || end === -1) {
            throw new AppError("Texto do boletim incompleto ou não encontrado.");
        }

        return text.slice(start, end).trim();
    }

    private extractMateriasAndNotas(text: string): any[] {
        const materias = [] as any;
        const lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);

        lines.forEach(line => {
            const result = this.extractNotaFromLine(line);
            if (result) {
                materias.push(result);
            }
        });

        return materias;
    }

    private extractNotaFromLine(line: string): any | null {
        // Separar a linha entre nome da matéria e as notas
        const match = line.match(/^(.+?)(\d{2,3})([MBIR\-]+)$/);
        if (!match) return null;
    
        const nomeMateria = match[1].trim();
        const notasRaw = match[3].trim();
    
        const bimestre1 = this.extractNota(notasRaw.slice(0, 2));
        const bimestre2 = this.extractNota(notasRaw.slice(2, 4));
    
        return {
            materia: nomeMateria,
            bimestre1,
            bimestre2
        };
    }
    
    private extractNota(notaRaw: string): string {
        if (notaRaw === 'MB') return 'MB';
        if (notaRaw[0] === 'M') return 'MB';
        if (notaRaw[0] === 'B') return 'B';
        if (notaRaw[0] === 'I') return 'I';
        if (notaRaw[0] === 'R') return 'R';
        return '-';
    }
}
