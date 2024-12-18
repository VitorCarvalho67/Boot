import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";

export class GetCurriculoUseCase {
    async execute(email: string) {
        if (!email) {
            throw new AppError("Parâmetros insufientes ou inválidos. " + email);
        }

        const aluno = await prisma.aluno.findFirst({
            where: {
                email: email
            },
        });

        if (!aluno) {
            throw new AppError("Aluno não encontrado.");
        }

        const vinculos = await prisma.vinculo.findMany({
            where:{
                AND: [
                    {OR: [
                        {alunoId: aluno.id},
                        {vinculoComAlunoId: aluno.id}
                    ]},
                    {accepted: true}
            ]}
        });

        return {
            curriculo: aluno.curriculo,
            nome: aluno.name,
            endereco: aluno.endereco,
            nascimento: aluno.dataNascimento,
            email: email,
            rm: aluno.rm,
            quantidadeVinculos: vinculos.length
        };
    }
}