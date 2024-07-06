import { prisma } from '../../../prisma/client';
import { RegisterVagaDTO } from '../../interfaces/funcionarioDTOs';
import { AppError } from '../../../errors/error';

export class RegisterVagaUseCase {
    async execute({ titulo, cadastrador, empresa, requisitos, beneficios, remuneracao, cargaHoraria, entrada, saida, status, curso, descricao }: RegisterVagaDTO){
        if (!cadastrador) {
            throw new AppError('O campo "cadastrador" deve ser enviado.');
        }

        if (!empresa) {
            throw new AppError('O campo "empresa" deve ser enviado.');
        }


        if (!requisitos) {
            throw new AppError('O campo "requisitos" deve ser enviado.');
        }


        if (!beneficios) {
            throw new AppError('O campo "beneficios" deve ser enviado.');
        }


        if (!remuneracao) {
            throw new AppError('O campo "remuneracao" deve ser enviado.');
        }


        if (!cargaHoraria) {
            throw new AppError('O campo "cargaHoraria" deve ser enviado.');
        }


        if (!entrada) {
            throw new AppError('O campo "entrada" deve ser enviado.');
        }

        if (!saida) {
            throw new AppError('O campo "saida" deve ser enviado.');
        }

        if (!status) {
            throw new AppError('O campo "status" deve ser enviado.');
        }

        if (!descricao) {
            throw new AppError('O campo "descricao" deve ser enviado.');
        }

        const funcionario = await prisma.funcionario.findFirst({
            where: {
                email: cadastrador
            }
        });

        if (!funcionario) {
            throw new AppError('Cadastrador inválido!');
        }

        const empresaExists = await prisma.empresa.findFirst({
            where: {
                email: empresa
            }
        });

        if (!empresaExists) {
            throw new AppError('Empresa inválida!');
        }

        const cursoExists = await prisma.curso.findFirst({
            where: {
                name: curso,
            }
        });
        
        if (!cursoExists) {
            throw new AppError('Curso inválido!');
        }

        const vagaAlreadyExists = await prisma.vaga.findFirst({
            where: {
                titulo: titulo,
                empresaId: empresaExists.id
            }
        });

        if (vagaAlreadyExists) {
            throw new AppError('Vaga já cadastrada para o período especificado!');
        }

        const novaVaga = await prisma.vaga.create({
            data: {
                titulo,
                cursoId: cursoExists.id,
                empresaId: empresaExists.id,
                requisitos: JSON.stringify(requisitos),
                beneficios: JSON.stringify(beneficios),
                remuneracao,
                cargaHoraria,
                entrada,
                saida,
                status,
                descricao,
                cadastradorId: funcionario.id
            }
        });

        return {
            message: "Vaga registrada com sucesso"
            // cursoId: novaVaga.cursoId,
            // empresaId: novaVaga.empresaId,
            // requisitos: novaVaga.requisitos,
            // beneficios: novaVaga.beneficios,
            // remuneracao: novaVaga.remuneracao,
            // cargaHoraria: novaVaga.cargaHoraria,
            // dataInicio: novaVaga.dataInicio,
            // dataFim: novaVaga.dataFim,
            // status: novaVaga.status,
            // cadastradorId: novaVaga.cadastradorId
        };
    }
}
