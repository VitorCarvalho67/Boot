import { Request, Response } from "express";
import { LoginFuncionarioUseCase } from "./LoginFuncionarioUseCase";

export class LoginFuncionarioController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const loginFuncionarioUseCase = new LoginFuncionarioUseCase();

        const result = await loginFuncionarioUseCase.execute({ email, password });

        return res.status(201).json(result);
    }
}