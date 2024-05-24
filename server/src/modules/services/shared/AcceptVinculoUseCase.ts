import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { VinculoDTO, IdentificadorEnum } from "../../interfaces/sharedDTOs";

export class AcceptVinculoUseCase {
    async execute({ email1, email2, identifier1, identifier2 }: VinculoDTO) {
        if (!email1 || !email2 || !identifier1 || !identifier2) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const entidade1 = await this.encontrarEntidadePeloEmail(email1, identifier1);
        const entidade2 = await this.encontrarEntidadePeloEmail(email2, identifier2);

        if (!entidade1) {
            throw new AppError(`${identifier1.charAt(0).toUpperCase()}${identifier1.slice(1).toLowerCase()} não encontrado.`);
        }

        if (!entidade2) {
            throw new AppError(`${identifier2.charAt(0).toUpperCase()}${identifier2.slice(1).toLowerCase()} não encontrado.`);
        }

        const vinculoExists = await prisma.vinculo.findFirst({
            where: {
                alunoId: (identifier1 == "ALUNO") ? entidade1.id : null,
                professorId: (identifier1 == "PROFESSOR") ? entidade1.id : null,
                vinculoComAlunoId: (identifier2 == "ALUNO") ? entidade2.id : null,
                vinculoComProfessorId: (identifier2 == "PROFESSOR") ? entidade2.id : null
            },
        });

        if(vinculoExists){
            throw new AppError("Solicitação inexistente");
        }

        const vinculo = await prisma.vinculo.update({
            where: {
                alunoId_professorId_vinculoComAlunoId_vinculoComProfessorId: {
                    alunoId: identifier1 === IdentificadorEnum.ALUNO ? entidade1.id : "",
                    professorId: identifier1 === IdentificadorEnum.PROFESSOR ? entidade1.id : "",
                    vinculoComAlunoId: identifier2 === IdentificadorEnum.ALUNO ? entidade2.id : "",
                    vinculoComProfessorId: identifier2 === IdentificadorEnum.PROFESSOR ? entidade2.id : ""
                }
            },
            data:{
                accepted: true
            }
        });

        return "Solicitação aceita!";
    }

    private async encontrarEntidadePeloEmail(email: string, identifier: IdentificadorEnum) {
        switch (identifier) {
            case IdentificadorEnum.ALUNO:
                return prisma.aluno.findUnique({
                    where: { email }
                });
            case IdentificadorEnum.PROFESSOR:
                return prisma.professor.findUnique({
                    where: { email }
                });
            default:
                return null;
        }
    }
}
