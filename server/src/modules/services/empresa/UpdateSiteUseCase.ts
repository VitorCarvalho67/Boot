import { prisma } from "../../../prisma/client";
import { UpdateSiteDTO } from "../../interfaces/empresaDTOs"
import { AppError } from "../../../errors/error";

export class UpdateSiteUseCase {
    async execute({ email, site }: UpdateSiteDTO) {

        if (!email) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const empresa = await prisma.empresa.findUnique({
            where: {
                email
            }
        });

        if (empresa) {
            await prisma.empresa.update({
                where: {
                    email
                },
                data: {
                    site: site
                }
            });

            return;
        } else {
            throw new AppError("Email não encontrado");
        }
    }
}