import { Professor } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { CreateActivityDTO } from "../../interfaces/professorDTOs";
import { clearUploads } from "../shared/helpers/helpers";
import { uploadToMinio } from "../../../minioService";


export class CreateActivityUseCase {
    async execute({ title, descricao, professorId, imagem }: CreateActivityDTO) {
        if (!title || !descricao || !professorId || !imagem) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const professor = await prisma.professor.findUnique({
            where: { id: professorId }
        });

        if (!professor) {
            throw new Error('Professor não encontrado');
        }

        const bucketName = 'boot';
        const objectName = `atividades/${professor.email}/title`;

        try {
            const filePath = imagem.path;
            await uploadToMinio(bucketName, objectName, filePath);

            clearUploads();
            await prisma.atividade.create({
                data: {
                    title,
                    descricao,
                    professorId,
                    imagem: objectName
                }
            });
    
            return "Atividade criada com sucesso1";
        } catch (error) {
            throw new AppError(`Error uploading image: ${error}`);
        }
    }
}