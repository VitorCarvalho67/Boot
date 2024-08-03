import { Request, Response } from "express";
import { InitFuncionarioUseCase } from "../services/funcionario/InitFuncionarioUseCase";
import { LoginFuncionarioUseCase } from "../services/funcionario/LoginFuncionarioUseCase";
import { ValidateFuncionarioUseCase } from "../services/funcionario/ValidateFuncionarioUseCase";
import { RecoveryFuncionarioUseCase } from "../services/funcionario/RecoveryUseCase";
import { ValidateRecoveryUseCase } from "../services/funcionario/ValidateRecoveryUseCase";
import { RefreshTokenUseCase } from "../services/funcionario/RefreshTokenUseCase";
import { RegisterVagaUseCase } from "../services/funcionario/RegisterVagasUseCase";
import { SetEmpresaParceiraUseCase } from "../services/funcionario/SetAsParceiraUseCase";
import { SetEmpresaParceiraDTO } from "../interfaces/funcionarioDTOs";

export class InitFuncionarioController {
    async handle(req: Request, res: Response) {
        const email = req.query.email as string;
        const cargo = req.query.cargo as any;

        const initFuncionarioUseCase = new InitFuncionarioUseCase();

        const result = await initFuncionarioUseCase.execute({ email, cargo });

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

export class RecoveryFuncionarioController {
    async handle(req: Request, res: Response) {
        const { name, email } = req.body;

        const recoveryFuncionarioUSecase = new RecoveryFuncionarioUseCase();

        const result = await recoveryFuncionarioUSecase.execute({ name, email });

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
        const email = req.body.funcionario.email;

        const refreshTokenUseCase = new RefreshTokenUseCase();

        const result = await refreshTokenUseCase.execute(email);

        return res.status(201).json(result);
    }
}

export class RegisterVagaController {
    async handle(req: Request, res: Response) {
        const cadastrador = req.body.funcionario.email;
        const { 
            titulo,
            empresa,
            requisitos,
            beneficios,
            remuneracao,
            cargaHoraria,
            entrada,
            saida,
            status,
            curso,
            descricao
        } = req.body;

        const registerVagaUseCase = new RegisterVagaUseCase();

        const result = await registerVagaUseCase.execute({
            cadastrador,
            titulo,
            empresa,
            requisitos,
            beneficios,
            remuneracao,
            cargaHoraria,
            entrada,
            saida,
            status,
            curso,
            descricao
        });

        return res.status(201).json(result);
    }
}

export class FuncionarioController {
    async handle(req: Request, res: Response) {
        const funcionarioId = req.body.funcionario.id;
        const { emailEmpresa }: SetEmpresaParceiraDTO = req.body;

        const setEmpresaParceiraUseCase = new SetEmpresaParceiraUseCase();

        const result = await setEmpresaParceiraUseCase.execute({ funcionarioId, emailEmpresa });
        return res.status(200).json(result);
    }
}