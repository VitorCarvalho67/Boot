import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";

export class GetProfessorUseCase {
    async execute(email: string) {
        if (!email) {
            throw new AppError("Parâmetros insufientes ou inválidos. " + email);
        }

        const professor = await prisma.professor.findFirst({
            where: {
                email: email
            },
        });

        if (!professor) {
            throw new AppError("professor não encontrado.");
        }

        const vinculos = await prisma.vinculo.findMany({
            where:{
                AND: [
                    {OR: [
                        {professorId: professor.id},
                        {vinculoComProfessorId: professor.id}
                    ]},
                    {accepted: true}
            ]}
        });

        return {
            curriculo: professor.curriculo,
            nome: professor.name,
            email: email,
            quantidadeVinculos: vinculos.length
        };
    }
}