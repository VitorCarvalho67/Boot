import { Request, Response } from "express";
import { InitProfessorUseCase } from "../services/professor/InitProfessorUseCase";
import { LoginProfessorUseCase } from "../services/professor/LoginProfessorUseCase";
import { ValidateProfessorUseCase } from "../services/professor/ValidateProfessorUseCase";
import { ValidateRecoveryUseCase } from "../services/professor/ValidateRecoveryUseCase";
import { RecoveryProfessorUseCase } from "../services/professor/RecoveryProfessorUseCase";
import { RefreshTokenUseCase } from "../services/professor/RefreshTokenUseCase";

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

export class RecoveryProfessorController {
    async handle(req: Request, res: Response) {
        const { name, email } = req.body;

        const recoveryProfessorUSecase = new RecoveryProfessorUseCase();

        const result = await recoveryProfessorUSecase.execute({ name, email });

        return res.status(201).json(result);
    }
}

export class ValidateRecoveryController {
    async handle(req: Request, res: Response) {
        const { email, recoveryPass, newPass } = req.body;

        const validateRecoveryUseCase = new ValidateRecoveryUseCase();

        const result = await validateRecoveryUseCase.execute({ email, recoveryPass, newPass });

        return res.status(201).json(result);
    }
}

export class RefreshTokenController {
    async handle(req: Request, res: Response) {
        const email = req.body.entidade.email;

        const refreshTokenUseCase = new RefreshTokenUseCase();

        const result = await refreshTokenUseCase.execute(email);

        return res.status(201).json(result);
    }
}