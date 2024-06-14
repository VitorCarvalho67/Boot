import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { GetEntidadeDTO } from "../../interfaces/sharedDTOs";
import { FindEntidade } from "./helpers/helpers";

export class GetVinculosProfileUseCase {
    async execute({ email, identifier }: GetEntidadeDTO) {
        if (!email) {
            throw new AppError("Email necessário.");
        }

        if (!identifier) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const entidade = await FindEntidade(email, identifier);

        if (!entidade) {
            throw new AppError(`${identifier.charAt(0).toUpperCase()}${identifier.slice(1).toLowerCase()} não encontrado.`);
        }

        let aceitosData, enviadosData, recebidosData;
        aceitosData = await prisma.vinculo.findMany({
            where: {
                OR: [
                    { alunoId: entidade.id },
                    { professorId: entidade.id },
                    { vinculoComAlunoId: entidade.id },
                    { vinculoComProfessorId: entidade.id },
                ],
                accepted: true
            },
            include: {
                professor: true
            }
        });
        enviadosData = await prisma.vinculo.findMany({
            where: {
                OR: [
                    { alunoId: entidade.id },
                    { professorId: entidade.id },
                ],
                accepted: false
            },
            include: {
                professor: true
            }
        });
        recebidosData = await prisma.vinculo.findMany({
            where: {
                OR: [
                    { vinculoComAlunoId: entidade.id },
                    { vinculoComProfessorId: entidade.id },
                ],
                accepted: false
            },
            include: {
                professor: true
            }
        });

        const aceitos = await Promise.all(aceitosData.map(async (aceito: any) => {
            const vinculo = async () => {
                if (aceito.alunoId) {
                    if (aceito.alunoId != entidade.id){
                        const aluno = await prisma.aluno.findUnique({ where: { id: aceito.alunoId } });
                        if (aluno) {
                            return {
                                aluno:{
                                    email: aluno.email,
                                    rm: aluno.rm,
                                    endereco: aluno.endereco,
                                    nome: aluno.name
                                }
                            }
                        }
                    }
                } else if (aceito.professorId) {
                    if(aceito.professorId != entidade.id){
                        const professor = await prisma.professor.findUnique({ where: { id: aceito.professorId } });
                        if(professor){
                            return{
                                professor:{
                                    email: professor.email,
                                    nome: professor.name,
                                    titulo: professor.tituloPrincipal
                                }
                            }
                        }
                    }
                }
            
                if (aceito.vinculoComAlunoId) {
                    if(aceito.vinculoComAlunoId != entidade.id){
                        const aluno = await prisma.aluno.findUnique({ where: { id: aceito.vinculoComAlunoId } });
                        if(aluno){
                            return {
                                aluno:{
                                    email: aluno.email,
                                    rm: aluno.rm,
                                    endereco: aluno.endereco,
                                    nome: aluno.name
                                }
                            }
                        }
                    }
                } else if (aceito.vinculoComProfessorId) {
                    if(aceito.vinculoComProfessorId != entidade.id){
                        const professor = await prisma.professor.findUnique({ where: { id: aceito.vinculoComProfessorId } });
                        if (professor){
                            return {
                                professor:{
                                    email: professor.email,
                                    nome: professor.name,
                                    titulo: professor.tituloPrincipal
                                }
                            }
                        }
                    }
                }
            }

            const sender = async () => {
                if (aceito.alunoId) {
                    const aluno = await prisma.aluno.findUnique({ where: { id: aceito.alunoId } });
                    return aluno ? aluno.email : null;
                } else if (aceito.professorId) {
                    const professor = await prisma.professor.findUnique({ where: { id: aceito.professorId } });
                    return professor ? professor.email : null;
                }
            }

            const recipient = async () => {
                if (aceito.vinculoComAlunoId) {
                    const aluno = await prisma.aluno.findUnique({ where: { id: aceito.vinculoComAlunoId } });
                    return aluno ? aluno.email : null;
                } else if (aceito.vinculoComProfessorId) {
                    const professor = await prisma.professor.findUnique({ where: { id: aceito.vinculoComProfessorId } });
                    return professor ? professor.email : null;
                }
            }

            return {
                data: await vinculo(),
                info:{
                    sender: await sender(),
                    recipient: await recipient(),
                    senderIdentifier: (aceito.alunoId) ? "ALUNO" : "PROFESSOR",
                    recipientIdentifier: (aceito.vinculoComAlunoId) ? "ALUNO" : "PROFESSOR"
                }
            }
        }));

        const enviados = await Promise.all(enviadosData.map(async (enviado: any) => {
            const vinculo = async () => {
                if (enviado.alunoId && enviado.alunoId != entidade.id ) {
                    const aluno = await prisma.aluno.findUnique({ where: { id: enviado.alunoId } });
                    if(aluno){
                        return {
                            aluno: {
                                rm: aluno.rm,
                                endereco: aluno.endereco,
                                nome: aluno.name
                            }
                        }
                    }
                } else if (enviado.professorId && enviado.professorId != entidade.id ) {
                    const professor = await prisma.professor.findUnique({ where: { id: enviado.professorId } });
                    if(professor){
                        return {
                            professor: {
                                nome: professor.name,
                                titulo: professor.tituloPrincipal
                            }
                        }
                    }
                }

                if (enviado.vinculoComAlunoId && enviado.vinculoComAlunoId != entidade.id ) {
                    const aluno = await prisma.aluno.findUnique({ where: { id: enviado.vinculoComAlunoId } });
                    if(aluno){
                        return {
                            aluno: {
                                rm: aluno.rm,
                                endereco: aluno.endereco,
                                nome: aluno.name
                            }
                        }
                    }
                } else if (enviado.vinculoComProfessorId && enviado.vinculoComProfessorId != entidade.id ) {
                    const professor = await prisma.professor.findUnique({ where: { id: enviado.vinculoComProfessorId } });
                    if(professor){
                        return {
                            professor:{
                                nome: professor.name,
                                titulo: professor.tituloPrincipal
                            }
                        }
                    }
                }
            }

            const sender = async () => {
                if (enviado.alunoId) {
                    const aluno = await prisma.aluno.findUnique({ where: { id: enviado.alunoId } });
                    return aluno ? aluno.email : null;
                } else if (enviado.professorId) {
                    const professor = await prisma.professor.findUnique({ where: { id: enviado.professorId } });
                    return professor ? professor.email : null;
                }
            }

            const recipient = async () => {
                if (enviado.vinculoComAlunoId) {
                    const aluno = await prisma.aluno.findUnique({ where: { id: enviado.vinculoComAlunoId } });
                    return aluno ? aluno.email : null;
                } else if (enviado.vinculoComProfessorId) {
                    const professor = await prisma.professor.findUnique({ where: { id: enviado.vinculoComProfessorId } });
                    return professor ? professor.email : null;
                }
            }

            return {
                data: await vinculo(),
                info:{
                    sender: await sender(),
                    recipient: await recipient(),
                    senderIdentifier: (enviado.alunoId) ? "ALUNO" : "PROFESSOR",
                    recipientIdentifier: (enviado.vinculoComAlunoId) ? "ALUNO" : "PROFESSOR"
                }
            }
        }));

        const recebidos = await Promise.all(recebidosData.map(async (recebido: any) => {
            const vinculo = async () => {
                if (recebido.alunoId && recebido.alunoId != entidade.id) {
                    const aluno = await prisma.aluno.findUnique({ where: { id: recebido.alunoId } });
                    if(aluno){
                        return {
                            aluno:{
                                rm: aluno.rm,
                                endereco: aluno.endereco,
                                nome: aluno.name
                            }
                        }
                    }
                } else if (recebido.professorId && recebido.professorId != entidade.id) {
                    const professor = await prisma.professor.findUnique({ where: { id: recebido.professorId } });
                    if(professor){
                        return {
                            professor: {
                                nome: professor.name,
                                titulo: professor.tituloPrincipal
                            }
                        }
                    }
                }

                if (recebido.vinculoComAlunoId && recebido.vinculoComAlunoId != entidade.id) {
                    const aluno = await prisma.aluno.findUnique({ where: { id: recebido.vinculoComAlunoId } });
                    if(aluno){
                        return {
                            aluno:{
                                rm: aluno.rm,
                                endereco: aluno.endereco,
                                nome: aluno.name
                            }
                        }
                    }
                } else if (recebido.vinculoComProfessorId && recebido.vinculoComProfessorId != entidade.id) {
                    const professor = await prisma.professor.findUnique({ where: { id: recebido.vinculoComProfessorId } });
                    if(professor){
                        return {
                            professor: {
                                nome: professor.name,
                                titulo: professor.tituloPrincipal
                            }
                        }
                    }
                }
            }

            const sender = async () => {
                if (recebido.alunoId) {
                    const aluno = await prisma.aluno.findUnique({ where: { id: recebido.alunoId } });
                    return aluno ? aluno.email : null;
                } else if (recebido.professorId) {
                    const professor = await prisma.professor.findUnique({ where: { id: recebido.professorId } });
                    return professor ? professor.email : null;
                }
            }

            const recipient = async () => {
                if (recebido.vinculoComAlunoId) {
                    const aluno = await prisma.aluno.findUnique({ where: { id: recebido.vinculoComAlunoId } });
                    return aluno ? aluno.email : null;
                } else if (recebido.vinculoComProfessorId) {
                    const professor = await prisma.professor.findUnique({ where: { id: recebido.vinculoComProfessorId } });
                    return professor ? professor.email : null;
                }
            }

            return {
                data: await vinculo(),
                info: {
                    sender: await sender(),
                    recipient: await recipient(),
                    senderIdentifier: (recebido.alunoId) ? "ALUNO" : "PROFESSOR",
                    recipientIdentifier: (recebido.vinculoComAlunoId) ? "ALUNO" : "PROFESSOR"
                }
            }
        }));

        return {
            aceitos,
            enviados,
            recebidos
        };
    }
}