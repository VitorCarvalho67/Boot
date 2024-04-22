import { Request, Response } from "express";
import { ValidateRecoveryUseCase } from "./validateRecoveryUseCase";

export class ValidateRecoveryController {
    async handle(req: Request, res: Response) {
        const { email, recoveryPassword, newPass } = req.body;

        const validateRecovery = new ValidateRecoveryUseCase();

        const result = await validateRecovery.execute({ email, recoveryPassword, newPass});

        return res.status(201).json(result);
    }
}