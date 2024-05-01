import { Request, Response } from "express";
import { ValidateProfessorUseCase } from "./ValidateProfessorUseCase";

export class ValidateProfessorController {
    async handle(req: Request, res: Response) {
        const { email, temporaryPassword, newPassword } = req.body;

        const validateProfessorUseCase = new ValidateProfessorUseCase();

        const result = await validateProfessorUseCase.execute({ email, temporaryPassword, newPassword });

        return res.status(201).json(result);
    }
}