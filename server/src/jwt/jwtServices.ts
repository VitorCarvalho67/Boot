import { sign, verify, JwtPayload } from "jsonwebtoken";
import { Aluno, Admin } from "@prisma/client";

function generateAccessTokenAluno(aluno: Aluno): string {
    return sign({ alunoId: aluno.id }, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: '50m',
    });
}

function generateAccessTokenAdmin(admin: Admin): string {
    return sign({ adminId: admin.id }, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: '50m',
    });
}

function verfifyAccessToken(token: string): string | JwtPayload {
    return verify(token, process.env.JWT_ACCESS_SECRET as string);
}

export { generateAccessTokenAluno, generateAccessTokenAdmin };