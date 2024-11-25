import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { uploadToMinio } from "../../../minioService";
import { UploadImageDTO } from "../../interfaces/alunoDTOs";
import { clearUploads } from "../shared/helpers/helpers";

export class UploadProfileUseCase {
    async execute({ email, file } : UploadImageDTO) {

        if (!email) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        } else if (!file) {
            throw new AppError("File precisa ser enviado.");
        }

        const professor = await prisma.professor.findUnique({
            where: {
                email
            }
        });

        if (professor) {
            const bucketName = 'boot';
            const objectName = `professor/${professor.id}/perfil`;

            try {
                const filePath = file.path;
                await uploadToMinio(bucketName, objectName, filePath);
                
                await prisma.professor.update({
                    where: {
                        email
                    },
                    data: {
                        imagem: objectName
                    }
                });

                clearUploads();
                return { message: 'Imagem de perfil salva com sucesso!.' };
            } catch (error) {
                throw new AppError(`Error uploading image: ${error}`);
            }
        } else {
            throw new AppError("Email não encontrado");
        }
    }
}