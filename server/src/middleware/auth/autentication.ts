import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/error';
import { prisma } from '../../prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import { 
    verfifyAccessTokenAdmin,
    verfifyAccessTokenProfessor,
    verfifyAccessTokenFuncinario,
    verfifyAccessTokenAluno,
    verfifyAccessTokenEmpresa
} from '../../jwt/jwtServices';

interface RequestWithAdmin extends Request {
    admin?: { id: String };
}

interface RequestWithProfessor extends Request {
    professor?: { id: String, email: String };
}

interface RequestWithFuncionario extends Request {
    funcionario?: { id: String };
}

interface RequestWithEmpresa extends Request {
    empresa?: { id: String };
}

interface RequestWithAluno extends Request {
    aluno?: { id: String, email: String };
}

export async function adminAuthMiddleware(req: RequestWithAdmin, res: Response, next: NextFunction) {
    try {
        // Authorization: YOUR_JWT_TOKEN

        const token = req.headers.authorization;

        if (!token) {
            throw new AppError('Token not found');
        }

        const decoded = verfifyAccessTokenAdmin(token);

        if (!decoded || typeof decoded === 'string') {
            throw new AppError('Invalid token');
        }

        const admin = await prisma.admin.findUnique({
            where: { id: (decoded as JwtPayload).adminId }
        });

        if (!admin) {
            throw new AppError('Admin not found');
        }

        req.admin = { id: admin.id };

        next();
    } catch (error) {
        res.status(401).json({ message: 'Sessão de administrador inválida ou encerrada: ' + error });
    }
}

export async function professorAuthMiddleware(req: RequestWithProfessor, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            throw new AppError('Token not found');
        }

        const decoded = verfifyAccessTokenProfessor(token);

        if (!decoded || typeof decoded === 'string') {
            throw new AppError('Invalid token');
        }

        const professor = await prisma.professor.findUnique({
            where: { id: (decoded as JwtPayload).professorId }
        });

        if (!professor) {
            throw new AppError('Professor not found');
        }

        req.body.entidade = { id: professor.id, email: professor.email };

        next();
    } catch (error) {
        res.status(401).json({ message: 'Sessão de professor inválida ou encerrada: ' + error });
    }
}

export async function funcionarioAuthMiddleware(req: RequestWithFuncionario, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            throw new AppError('Token not found');
        }

        const decoded = verfifyAccessTokenFuncinario(token);

        if (!decoded || typeof decoded === 'string') {
            throw new AppError('Invalid token');
        }

        const funcionario = await prisma.funcionario.findUnique({
            where: { id: (decoded as JwtPayload).funcionarioId }
        });

        if (!funcionario) {
            throw new AppError('Funcionário not found');
        }

        req.funcionario = { id: funcionario.id };

        next();
    } catch (error) {
        res.status(401).json({ message: 'Sessão de funcionário inválida ou encerrada: ' + error });
    }
}

export async function empresaAuthMiddleware(req: RequestWithEmpresa, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            throw new AppError('Token not found');
        }

        const decoded = verfifyAccessTokenEmpresa(token);

        if (!decoded || typeof decoded === 'string') {
            throw new AppError('Invalid token');
        }

        const empresa = await prisma.empresa.findUnique({
            where: { id: (decoded as JwtPayload).empresaId }
        });

        if (!empresa) {
            throw new AppError('Empresa not found');
        }

        req.empresa = { id: empresa.id };

        next();
    } catch (error) {
        res.status(401).json({ message: 'Sessão de empresa inválida ou encerrada: ' + error });
    }
}

export async function alunoAuthMiddleware(req: RequestWithAluno, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            throw new AppError('Token not found');
        }

        const decoded = verfifyAccessTokenAluno(token);

        if (!decoded || typeof decoded === 'string') {
            throw new AppError('Invalid token');
        }

        const aluno = await prisma.aluno.findUnique({
            where: { id: (decoded as JwtPayload).alunoId }
        });

        if (!aluno) {
            throw new AppError('Aluno not found');
        }

        req.body.entidade = { id: aluno.id, email: aluno.email }; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Sessão de aluno inválida ou encerrada: ' + error });
    }
}