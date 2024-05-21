import { prisma } from "../../../prisma/client";
import { CompleteAlunoDTO } from "../../interfaces/alunoDTOs"
import { AppError } from "../../../errors/error";

export class CompleteAlunoUseCase {
    async execute({ email, nascimento, endereco, turma, rm }: CompleteAlunoDTO) {

        if (!email || !nascimento || !endereco || !turma || !rm) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }
        
        const aluno = await prisma.aluno.findUnique({
            where: {
                email
            }
        });

        if (aluno) {
            const rmAlreadyExists = await prisma.aluno.findFirst({
                where: {
                    rm
                }
            });

            if (!rmAlreadyExists) {
                prisma.aluno.update({
                    where: {
                        email
                    },
                    data: {
                        dataNascimento: nascimento,
                        endereco,
                        turmas: turma,
                        rm
                    }
                });

                return;
            } else {
                throw new AppError("RM já cadastrado");
            }
        } else {
            throw new AppError("Email não encontrado");
        }
    }
}