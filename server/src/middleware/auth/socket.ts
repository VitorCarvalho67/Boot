import { prisma } from '../../prisma/client';
import { AppError } from '../../errors/error';
import { JwtPayload } from 'jsonwebtoken';
import { 
    verfifyAccessTokenAluno
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

        const aluno = await prisma.aluno.findUnique({
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
