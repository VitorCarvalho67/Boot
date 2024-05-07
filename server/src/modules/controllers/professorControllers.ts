import { Request, Response } from "express";
import { InitProfessorUseCase } from "../services/professor/InitProfessorUseCase";
import { LoginProfessorUseCase } from "../services/professor/LoginProfessorUseCase";
import { ValidateProfessorUseCase } from "../services/professor/ValidateProfessorUseCase";

export class InitProfessorController {
    async handle(req: Request, res: Response) {
        const email = req.query.email as string;

        const initProfessorUseCase = new InitProfessorUseCase();
        
        const result = await initProfessorUseCase.execute({ email });

        return res.status(201).json(result);
    }
}

export class LoginProfessorController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const loginProfessorUseCase = new LoginProfessorUseCase();

        const result = await loginProfessorUseCase.execute({ email, password });

        return res.status(201).json(result);
    }
}

export class ValidateProfessorController {
    async handle(req: Request, res: Response) {
        const { email, temporaryPassword, newPassword } = req.body;

        const validateProfessorUseCase = new ValidateProfessorUseCase();

        const result = await validateProfessorUseCase.execute({ email, temporaryPassword, newPassword });

        return res.status(201).json(result);
    }
}