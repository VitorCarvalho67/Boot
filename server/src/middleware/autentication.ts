import { Request, Response, NextFunction } from 'express';
import { verfifyAccessTokenAdmin } from '../jwt/jwtServices';
import { prisma }  from '../prisma/client';
import { JwtPayload } from 'jsonwebtoken';

interface RequestWithAdmin extends Request {
    admin?: { id: String};
}

interface RequestWithProfessor extends Request {
    professor?: { id: String};
}

export async function adminAuthMiddleware(req: RequestWithAdmin, res: Response, next: NextFunction) {
    try{
        // Authorization: YOUR_JWT_TOKEN

        const token = req.headers.authorization;

        if (!token) {
            throw new Error('Token not found');
        }

        const decoded = verfifyAccessTokenAdmin(token);

        if (!decoded || typeof decoded === 'string') {
            throw new Error('Invalid token');
        }

        const admin = await prisma.admin.findUnique({
            where: { id: (decoded as JwtPayload).adminId }
        });

        if (!admin) {
            throw new Error('Admin not found');
        } 

        req.admin = { id: admin.id};

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token ' + error});
    }
}

export async function professorAuthMiddleware(req: RequestWithProfessor, res: Response, next: NextFunction) {
    try{
        const token = req.headers.authorization;

        if (!token) {
            throw new Error('Token not found');
        }

        const decoded = verfifyAccessTokenAdmin(token);

        if (!decoded || typeof decoded === 'string') {
            throw new Error('Invalid token');
        }

        const professor = await prisma.professor.findUnique({
            where: { id: (decoded as JwtPayload).professorId }
        });

        if (!professor) {
            throw new Error('Admin not found');
        }

        req.professor = { id: professor.id};

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token ' + error});
    }
}