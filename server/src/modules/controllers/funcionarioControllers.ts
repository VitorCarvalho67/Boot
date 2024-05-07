import { Request, Response } from "express";
import { InitFuncionarioUseCase } from "../services/funcionario/InitFuncionarioUseCase";
import { LoginFuncionarioUseCase } from "../services/funcionario/LoginFuncionarioUseCase";
import { ValidateFuncionarioUseCase } from "../services/funcionario/ValidateFuncionarioUseCase";

export class InitFuncionarioController {
    async handle(req: Request, res: Response) {
        const email = req.query.email as string;
        const cargo = req.query.cargo as any;        

        const initFuncionarioUseCase = new InitFuncionarioUseCase();
        
        const result = await initFuncionarioUseCase.execute({ email, cargo});

        return res.status(201).json(result);
    }
}

export class LoginFuncionarioController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const loginFuncionarioUseCase = new LoginFuncionarioUseCase();

        const result = await loginFuncionarioUseCase.execute({ email, password });

        return res.status(201).json(result);
    }
}

export class ValidateFuncionarioController {
    async handle(req: Request, res: Response) {
        const { email, temporaryPassword, newPassword } = req.body;

        const validateFuncionarioUseCase = new ValidateFuncionarioUseCase();

        const result = await validateFuncionarioUseCase.execute({ email, temporaryPassword, newPassword });

        return res.status(201).json(result);
    }
}