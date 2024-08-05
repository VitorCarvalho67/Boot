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
        
        const { link, info } = await this.extractInfoFromPdf(boletimBuffer);

        // console.log(`Ano Letivo / Semestre: ${info.anoLetivoSemestre}`);
        // console.log(`RM: ${info.rm}`);
        // console.log(`Nome do aluno: ${info.nomeAluno}`);
        // console.log(`Curso: ${info.curso}`);
        // console.log(`Modalidade: ${info.modalidade}`);
        // console.log(`Série / Módulo: ${info.serieModulo}`);
        // console.log(`Turno: ${info.turno}`);

        if (info.rm != aluno.rm){
            throw new AppError ("Boletim inválido: RM não corresponde");
        }
        if (info.nomeAluno != aluno.name){
            throw new AppError ("Boletim inválido: Nome não corresponde");
        }
        
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

    async extractInfoFromPdf(buffer: Buffer): Promise<{ link: string, info: any }> {
        const data = await pdf(buffer);
        const text = data.text;

        const urlMatch = text.match(/https:\/\/nsa\.cps\.sp\.gov\.br\?a=[a-z0-9-]+/i);
        if (!urlMatch) {
            throw new AppError('Boletim inválido: URL de autenticação não encontrado no boletim.');
        }

        const anoLetivoSemestreMatch = text.match(/Ano Letivo \/ Semestre: (\d{4})/);
        if (!anoLetivoSemestreMatch) {
            throw new AppError('Boletim inválido: Ano Letivo / Semestre não encontrado.');
        }

        const rmMatch = text.match(/RM: (\d+)/);
        if (!rmMatch) {
            throw new AppError('Boletim inválido: RM não encontrado.');
        }

        const nomeAlunoMatch = text.match(/Nome do aluno: ([^\n]+)/);
        if (!nomeAlunoMatch) {
            throw new AppError('Boletim inválido: Nome do aluno não encontrado.');
        }

        const cursoMatch = text.match(/Curso: ([^\n]+)/);
        if (!cursoMatch) {
            throw new AppError('Boletim inválido: Curso não encontrado.');
        }

        const modalidadeMatch = text.match(/Modalidade: ([^\n]+)/);
        if (!modalidadeMatch) {
            throw new AppError('Boletim inválido: Modalidade não encontrada.');
        }

        const serieModuloMatch = text.match(/Série \/ Módulo: ([^\n]+)/);
        if (!serieModuloMatch) {
            throw new AppError('Boletim inválido: Série / Módulo não encontrado.');
        }

        const turnoMatch = text.match(/Turno: ([^\n]+)/);
        if (!turnoMatch) {
            throw new AppError('Boletim inválido: Turno não encontrado.');
        }

        const info = {
            anoLetivoSemestre: anoLetivoSemestreMatch[1],
            rm: rmMatch[1],
            nomeAluno: nomeAlunoMatch[1],
            curso: cursoMatch[1],
            modalidade: modalidadeMatch[1],
            serieModulo: serieModuloMatch[1],
            turno: turnoMatch[1]
        };

        return { link: urlMatch[0], info: info };
    }
}
