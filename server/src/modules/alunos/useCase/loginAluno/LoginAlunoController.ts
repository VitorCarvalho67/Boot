import { Request, Response } from "express";
import { LoginAlunoUseCase } from "./LoginAlunoUseCase";

export class LoginAlunoController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const loginAlunoUseCase = new LoginAlunoUseCase();

        const result = await loginAlunoUseCase.execute({ email, password });

        return res.status(201).json(result);
    }
}