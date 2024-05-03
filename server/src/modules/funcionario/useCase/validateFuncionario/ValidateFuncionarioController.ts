import { Request, Response } from "express";
import { ValidateFuncionarioUseCase } from "./ValidateFuncionarioUseCase";

export class ValidateFuncionarioController {
    async handle(req: Request, res: Response) {
        const { email, temporaryPassword, newPassword } = req.body;

        const validateFuncionarioUseCase = new ValidateFuncionarioUseCase();

        const result = await validateFuncionarioUseCase.execute({ email, temporaryPassword, newPassword });

        return res.status(201).json(result);
    }
}