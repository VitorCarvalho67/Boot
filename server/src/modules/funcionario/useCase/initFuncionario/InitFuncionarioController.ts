import { Request, Response } from "express";
import { InitFuncionarioUseCase } from "./InitFuncionarioUseCase";

export class InitFuncionarioController {
    async handle(req: Request, res: Response) {
        const email = req.query.email as string;
        const cargo = req.query.cargo as any;        

        const initFuncionarioUseCase = new InitFuncionarioUseCase();
        
        const result = await initFuncionarioUseCase.execute({ email, cargo});

        return res.status(201).json(result);
    }
}