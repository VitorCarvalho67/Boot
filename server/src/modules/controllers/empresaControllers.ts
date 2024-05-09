import { Request, Response } from "express";
import { RegisterEmpresaUseCase } from '../services/empresa/RegisterEmpresaUseCase';
import { LoginEmpresaUseCase } from '../services/empresa/LoginEmpresaUseCase'
import { ValidateEmpresaUseCase } from '../services/empresa/ValidateEmpresaUseCase'
import { RecoveryEmpresaUseCase } from '../services/empresa/RecoveryEmpresaUseCase'
import { ValidateRecoveryEmpresaUseCase } from '../services/empresa/ValidateRecoveryEmpresa'

export class RegisterEmpresaController {
    async handle(req: Request, res: Response) {
        const { name, email, cnpj, password } = req.body;

        const registerEmpresaController = new RegisterEmpresaUseCase();

        const result = await registerEmpresaController.execute({ name, email, cnpj, password });

        return res.status(201).json(result);
    }
}

export class LoginEmpresaController {
    async handle(req: Request, res: Response) {
        const { cnpj, password } = req.body;

        const loginEmpresaUseCase = new LoginEmpresaUseCase();

        const result = await loginEmpresaUseCase.execute({ cnpj, password });

        return res.status(201).json(result);
    }
}

export class ValidateEmpresaController {
    async handle(req: Request, res: Response) {
        const { cnpj, token } = req.body;

        const validateEmpresaUseCase = new ValidateEmpresaUseCase();

        const result = await validateEmpresaUseCase.execute({ cnpj, token });

        return res.status(201).json(result);
    }
}

export class RecoveryEmpresaController {
    async handle(req: Request, res: Response) {
        const { cnpj, email } = req.body;

        const recoveryEmpresaUseCase = new RecoveryEmpresaUseCase();

        const result = await recoveryEmpresaUseCase.execute({ cnpj, email });

        return res.status(201).json(result);
    }
}

export class ValidateRecoveryEmpresaController {
    async handle(req: Request, res: Response) {
        const { cnpj, token, newPass } = req.body;

        const validateRecoveryEmpresaController = new ValidateRecoveryEmpresaUseCase();

        const result = await validateRecoveryEmpresaController.execute({ cnpj, token, newPass });

        return res.status(201).json(result);
    }
}