import { prisma } from '../../prisma/client';
import { AppError } from '../../errors/error';
import { JwtPayload } from 'jsonwebtoken';
import { 
    verfifyAccessTokenAluno,
    verfifyAccessTokenEmpresa,
    verfifyAccessTokenFuncinario,
    verfifyAccessTokenProfessor
} from '../../jwt/jwtServices';


export async function validateTokenAluno(token: string){
    try {
        const decoded = verfifyAccessTokenAluno(token);

        if (!decoded || typeof decoded === 'string') {
            throw new Error('Invalid token');
        }


        if (!decoded || typeof decoded === 'string') {
            throw new AppError('Invalid token');
        }

        const aluno = await prisma.aluno.findFirst({
            where: { id: (decoded as JwtPayload).alunoId }
        });

        if (!aluno) {
            throw new Error('Aluno not found');
        }

        return aluno;
    } catch (error) {
        throw new Error('Token inválido: ' + error);
    }
};

export async function validateTokenProfessor(token: string){
    try {
        const decoded = verfifyAccessTokenProfessor(token);

        if (!decoded || typeof decoded === 'string') {
            throw new Error('Invalid token');
        }


        if (!decoded || typeof decoded === 'string') {
            throw new AppError('Invalid token');
        }

        const professor = await prisma.professor.findUnique({
            where: { id: (decoded as JwtPayload).professorId }
        });

        if (!professor) {
            throw new Error('Professor not found');
        }

        return professor;
    } catch (error) {
        throw new Error('Token inválido: ' + error);
    }
};


export async function validateTokenFuncionario(token: string){
    try {
        const decoded = verfifyAccessTokenFuncinario(token);

        if (!decoded || typeof decoded === 'string') {
            throw new Error('Invalid token');
        }


        if (!decoded || typeof decoded === 'string') {
            throw new AppError('Invalid token');
        }

        const funcionario = await prisma.funcionario.findUnique({
            where: { id: (decoded as JwtPayload).funcionarioId }
        });

        if (!funcionario) {
            throw new Error('Funcionário not found');
        }

        return funcionario;
    } catch (error) {
        throw new Error('Token inválido: ' + error);
    }
};

export async function validateTokenEmpresa(token: string){
    try {
        const decoded = verfifyAccessTokenEmpresa(token);

        if (!decoded || typeof decoded === 'string') {
            throw new Error('Invalid token');
        }


        if (!decoded || typeof decoded === 'string') {
            throw new AppError('Invalid token');
        }

        const empresa = await prisma.empresa.findUnique({
            where: { id: (decoded as JwtPayload).empresaId }
        });

        if (!empresa) {
            throw new Error('Empresa not found');
        }

        return empresa;
    } catch (error) {
        throw new Error('Token inválido: ' + error);
    }
};

