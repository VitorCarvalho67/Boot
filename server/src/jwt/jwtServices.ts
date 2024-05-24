import { sign, verify, JwtPayload } from "jsonwebtoken";
import { Aluno, Admin, Professor, Funcionario, Empresa } from "@prisma/client";

export function generateAccessTokenAluno(aluno: Aluno): string {
    return sign({ alunoId: aluno.id}, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: '50m',
    });
}

export function generateAccessTokenAdmin(admin: Admin): string {
    return sign({ adminId: admin.id }, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: '50m',
    });
}

export function generateAccessTokenProfessor(professor: Professor): string {
    return sign({ professorId: professor.id }, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: '50m',
    });
}

export function generateAccessTokenFuncionario(funcionario: Funcionario): string {
    return sign({ funcionarioId: funcionario.id }, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: '50m',
    });
}

export function generateAccessTokenEmpresa(empresa: Empresa): string {
    return sign({ empresaId: empresa.id }, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: '50m',
    });
}

export function verfifyAccessTokenAluno(token: string): string | JwtPayload {
    return verify(token, process.env.JWT_ACCESS_SECRET as string);
}

export function verfifyAccessTokenAdmin(token: string): string | JwtPayload {
    return verify(token, process.env.JWT_ACCESS_SECRET as string);
}

export function verfifyAccessTokenProfessor(token: string): string | JwtPayload {
    return verify(token, process.env.JWT_ACCESS_SECRET as string);
}

export function verfifyAccessTokenFuncinario(token: string): string | JwtPayload {
    return verify(token, process.env.JWT_ACCESS_SECRET as string);
}

export function verfifyAccessTokenEmpresa(token: string): string | JwtPayload {
    return verify(token, process.env.JWT_ACCESS_SECRET as string);
}