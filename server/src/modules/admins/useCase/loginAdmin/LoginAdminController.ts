import { Request, Response } from "express";
import { LoginAdminUseCase } from "./LoginAdminUseCase";

export class LoginAdminController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const loginAdminUseCase = new LoginAdminUseCase();

        const result = await loginAdminUseCase.execute({ email, password });

        return res.status(201).json(result);
    }
}