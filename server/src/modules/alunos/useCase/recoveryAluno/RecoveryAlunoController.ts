import { Request, Response } from "express";
import { RecoveryAluno } from "./RecoveryAlunoUseCase";

export class RecoveryAlunoController {
    async handle(req: Request, res: Response) {
        const { name, email } = req.body;

        const loginAlunoUseCase = new RecoveryAluno();

        const result = await loginAlunoUseCase.execute({ name, email });

        return res.status(201).json(result);
    }
}