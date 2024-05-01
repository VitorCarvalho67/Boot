import { Request, Response } from "express";
import { LoginProfessorUseCase } from "./LoginProfessorUseCase";

export class LoginProfessorController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const loginProfessorUseCase = new LoginProfessorUseCase();

        const result = await loginProfessorUseCase.execute({ email, password });

        return res.status(201).json(result);
    }
}