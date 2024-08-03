import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import { prisma } from "../../../prisma/client";
import { SendNotasDTO } from "../../interfaces/alunoDTOs";
import { AppError } from "../../../errors/error";
import { clearUploads } from '../shared/helpers/helpers';
import { uploadToMinio } from "../../../minioService";

export class SendBoletimUseCase {
    async execute({ alunoId, boletim }: SendNotasDTO) {
        if (!alunoId) {
            throw new AppError('ID do aluno não fornecido.');
        }

        if (!boletim || !boletim.path) {
            throw new AppError('Arquivo do boletim não fornecido.');
        }

        const aluno = await prisma.aluno.findUnique({
            where: {
                id: alunoId,
            },
        });

        if (!aluno) {
            throw new AppError('Aluno não encontrado.');
        }

        const boletimPath = path.resolve(boletim.path);
        const boletimBuffer = fs.readFileSync(boletimPath);
        
        const link = await this.extractAuthUrlFromPdf(boletimBuffer);
        
        const bucketName = 'boot';
        const objectName = `aluno/${aluno.rm}/boletins/${path.basename(boletim.path)}`;

        try {
            await uploadToMinio(bucketName, objectName, boletimPath);

            await prisma.boletim.create({
                data: {
                    alunoId: aluno.id,
                    link: link,
                    caminho: objectName,
                }
            });

            await clearUploads();

            return { message: 'Boletim enviado e salvo com sucesso!' };
        } catch (error) {
            throw new AppError(`Erro ao salvar o boletim: ${error}`);
        }
    }

    async extractAuthUrlFromPdf(buffer: Buffer): Promise<string> {
        const data = await pdf(buffer);
        const text = data.text;

        const urlMatch = text.match(/https:\/\/nsa\.cps\.sp\.gov\.br\?a=[a-z0-9-]+/i);
        if (!urlMatch) {
            throw new AppError('URL de autenticação não encontrado no boletim.');
        }

        return urlMatch[0];
    }
}
