import { Admin } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { LoginAdminDTO } from "../../interfaces/adminDTOs"
import { AppError } from "../../../errors/error";
import { generateAccessTokenAdmin } from "../../../jwt/jwtServices";

const bcrypt = require('bcrypt');

export class LoginAdminUseCase {
    async execute({ email, password }: LoginAdminDTO): Promise<{ token: string, admin: Pick<Admin, 'name' | 'email'> }> {

        const admin = await prisma.admin.findUnique({
            where: {
                email
            }
        });

        if (!admin) {
            throw new AppError("Email ou senha inválidos");
        }

        const isPasswordValid = bcrypt.compareSync(password, admin.password);

        if (!isPasswordValid) {
            throw new AppError("Email ou senha inválidos");
        }

        const token = generateAccessTokenAdmin(admin);

        if (!token) {
            throw new AppError("Email ou senha inválidos");
        }

        return {
            token: token,
            admin: {
                name: admin.name,
                email: admin.email
            }
        }
    }
}