import { Request, Response } from "express";
import { InitProfessorUseCase } from "./InitProfessorUseCase";

export class InitProfessorController {
    async handle(req: Request, res: Response) {
        const email = req.query.email as string;

        const initProfessorUseCase = new InitProfessorUseCase();
        
        const result = await initProfessorUseCase.execute({ email });

        return res.status(201).json(result);
    }
}