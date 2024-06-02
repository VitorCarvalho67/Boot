import { prisma } from "../../../prisma/client";
import { UpdateCurriculoDTO } from "../../interfaces/alunoDTOs"
import { AppError } from "../../../errors/error";

export class UpdateCurriculoUseCase {
    async execute({ email, curriculo }: UpdateCurriculoDTO) {

        if (!email) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const aluno = await prisma.aluno.findUnique({
            where: {
                email
            }
        });

        if (aluno) {
            await prisma.aluno.update({
                where: {
                    email
                },
                data: {
                    curriculo: curriculo
                }
            });

            return;
        } else {
            throw new AppError("Email não encontrado");
        }
    }
}