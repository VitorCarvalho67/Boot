import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { uploadToMinio } from "../../../minioService";
import { UploadImageDTO } from "../../interfaces/alunoDTOs";
import { clearUploads } from "../shared/helpers/helpers";

export class UploadCapaUseCase {
    async execute({ email, file }: UploadImageDTO) {

        if (!email || !file) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const empresa = await prisma.empresa.findUnique({
            where: {
                email
            }
        });

        if (empresa) {
            const bucketName = 'boot';
            const objectName = `empresa/${empresa.id}/banner`;

            try {
                const filePath = file.path;
                await uploadToMinio(bucketName, objectName, filePath);

                await prisma.empresa.update({
                    where: {
                        email
                    },
                    data: {
                        banner: objectName
                    }
                });

                clearUploads();
                return { message: 'Imagem de banner salva com sucesso!' };
            } catch (error) {
                throw new AppError(`Error uploading image: ${error}`);
            }

            return;
        } else {
            throw new AppError("Email não encontrado");
        }
    }
}