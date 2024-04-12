import { sign, verify, JwtPayload } from "jsonwebtoken";
import { Aluno } from "@prisma/client";

function generateAccessToken(aluno: Aluno): string {
    return sign({ alunoId: aluno.id }, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: '50m',
    });
}

function verfifyAccessToken(token: string): string | JwtPayload {
    return verify(token, process.env.JWT_ACCESS_SECRET as string);
}

export { generateAccessToken, verfifyAccessToken };