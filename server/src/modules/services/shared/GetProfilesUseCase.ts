import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { getImgUrl } from "./helpers/helpers";
import { Aluno } from "@prisma/client";

export class SearchUsersUseCase {
    async execute() {
        try {
            const alunosBusca = await prisma.aluno.findMany({
                where:{
                    rm:{
                        not: null
                    }
                },
                select: {
                    email: true,
                    rm: true,
                    endereco: true,
                    name: true,
                    imagem: true,
                },
                orderBy:{
                    name: 'asc'
                }
            });

            if (!alunosBusca) {
                throw new AppError("Nenhum aluno encontrado.", 404);
            }
            
            const alunos = await Promise.all(alunosBusca.map(async (aluno) => {
                return {
                    email: aluno.email,
                    rm: aluno.rm,
                    endereco: aluno.endereco,
                    name: aluno.name,
                    imageUrl: await getImgUrl(aluno as Aluno)
                };
            }));            

            return {
                alunos: alunos
            }
        } catch (error) {
            console.error("Erro ao buscar alunos:", error);
            throw new AppError("Erro ao buscar alunos.", 500);
        }
    }
}