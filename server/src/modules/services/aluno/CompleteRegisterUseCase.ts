import { prisma } from "../../../prisma/client";
import { CompleteAlunoDTO } from "../../interfaces/alunoDTOs"
import { AppError } from "../../../errors/error";

export class CompleteAlunoUseCase {
    async execute({ email, nascimento, endereco, curso, inicio, rm }: CompleteAlunoDTO) {

        if (!email || !nascimento || !endereco || !curso || !inicio || !rm) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const [ano, mes, dia] = nascimento.split('-');

        const stringNascimento = new Date(`${ano}-${mes}-${dia}T00:00:00Z`);
        const nascimentoISO = stringNascimento.toISOString();
        
        const aluno = await prisma.aluno.findUnique({
            where: {
                email
            }
        });

        if (aluno) {
            const rmNull = await prisma.aluno.findFirst({
                where: {
                    rm: null,
                    email: email
                }
            });

            console.log(rmNull);

            if (rmNull) {
                const cursoExists = await prisma.curso.findFirst({
                    where: {
                        name: curso,
                    }
                });

                const rmExists = await prisma.aluno.findUnique({
                    where: {
                        rm,
                    }
                });
    
                if(rmExists){
                    throw new AppError("Outro aluno já usa esse RM");
                }

                if (!cursoExists) {
                    throw new AppError("Curso não encontrado.");
                }

                const turma = await prisma.turma.findFirst({
                    where: {
                        cursoId: cursoExists.id,
                        inicio
                    }
                });

                if (!turma) {
                    throw new AppError("Turma não encontrada para combinação de curso e ano: \n" + curso + " - " + inicio)
                }

                await prisma.aluno.update({
                    where: {
                        email
                    },
                    data: {
                        dataNascimento: nascimentoISO,
                        endereco,
                        rm: rm
                    }
                });
                
                await prisma.alunoTurma.create({
                    data: {
                        alunoId: aluno.id,
                        turmaId: turma.id,
                        
                    }
                });

                return "Dados cadastrais atualizados com sucesso!";
            } else {
                throw new AppError("RM já cadastrado");
            }
        } else {
            throw new AppError("Email não encontrado");
        }
    }
}