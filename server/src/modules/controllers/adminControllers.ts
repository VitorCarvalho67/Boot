import { Request, Response } from "express";
import { LoginAdminUseCase } from "../services/admin/LoginAdminUseCase";
import { RegisterCoordenadorUseCase } from '../services/admin/RegisterCoordenadorUseCase';
import { RegisterCursosUseCase } from '../services/admin/RegisterCursosUseCase';
import { RegisterFuncionarioUseCase } from '../services/admin/RegisterFuncionarioUseCase';
import { RegisterProfessorUseCase } from '../services/admin/RegisterProfessorUseCase';
import { RegisterTurmasUseCase } from '../services/admin/RegisterTurmasUseCase';
import { RefreshTokenUseCase } from "../services/admin/RefreshTokenUseCase";
import { GetProfessoresUseCase } from "../services/admin/Get/Professores";
import { GetFullTurmasUseCase } from "../services/admin/Get/Turmas";
import { GetFullFuncionariosUseCase } from "../services/admin/Get/Funcionario";
import { GetFullEstagiosUseCase } from "../services/admin/Get/Estagios";
import { GetFullCursosUseCase } from "../services/admin/Get/Cursos";
import { GetCoordenadorUseCase } from "../services/admin/Get/Coordenadores";
import { GetAllProfessoresNamesUseCase } from "../services/admin/Get/ProfessorNames";
import { GetCoordenadoresNamesUseCase } from "../services/admin/Get/CoordenasdoresNames";

export class GetAllProfessoresController {
    async handle(req: Request, res: Response) {

        const getProfessoresUseCase = new GetAllProfessoresNamesUseCase();

        const result = await getProfessoresUseCase.execute();

        return res.status(201).json(result);
    }
}

export class GetAllCoordenadoresController {
    async handle(req: Request, res: Response) {

        const getCoordenadorUseCase = new GetCoordenadoresNamesUseCase();

        const result = await getCoordenadorUseCase.execute();

        return res.status(201).json(result);
    }
}

export class GetFullProfessoresController {
    async handle(req: Request, res: Response) {

        const getProfessoresUseCase = new GetProfessoresUseCase();

        const result = await getProfessoresUseCase.execute();

        return res.status(201).json(result);
    }
}

export class GetFullCoordenadoresController {
    async handle(req: Request, res: Response) {

        const getCoordenadorUseCase = new GetCoordenadorUseCase();

        const result = await getCoordenadorUseCase.execute();

        return res.status(201).json(result);
    }
}

export class LoginAdminController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const loginAdminUseCase = new LoginAdminUseCase();

        const result = await loginAdminUseCase.execute({ email, password });

        return res.status(201).json(result);
    }
}

export class RegisterCoordenadorController {
    async handle(req: Request, res: Response) {
        const { name } = req.body;

        const registerControllerUseCase = new RegisterCoordenadorUseCase();

        const result = await registerControllerUseCase.execute({ name });

        return res.status(201).json(result);
    }
}

export class RegisterCursosController {
    async handle(req: Request, res: Response) {
        const { cursoName, turno, duracao, coordenador } = req.body;

        const registerCursosUseCase = new RegisterCursosUseCase();

        const result = await registerCursosUseCase.execute({ cursoName, turno, duracao, coordenador });

        return res.status(201).json(result);
    }
}

export class RegisterFuncionarioController {
    async handle(req: Request, res: Response) {
        const { name, email, password, cargo } = req.body;

        const registerFuncionarioUseCase = new RegisterFuncionarioUseCase();

        const result = await registerFuncionarioUseCase.execute({ name, email, password, cargo });

        return res.status(201).json(result);
    }
}

export class RegisterProfessorController {
    async handle(req: Request, res: Response) {
        const { name, email, password, tituloPrincipal } = req.body;

        const registerProfessorUseCase = new RegisterProfessorUseCase();

        const result = await registerProfessorUseCase.execute({ name, email, password, tituloPrincipal });

        return res.status(201).json(result);
    }
}

export class RegisterTurmaController {
    async handle(req: Request, res: Response) {
        const { inicio, fim, cursoName } = req.body;

        const registerTurmaUseCase = new RegisterTurmasUseCase();

        const result = await registerTurmaUseCase.execute({ inicio, fim, cursoName });

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

export class GetFullTurmasController {
    async handle(req: Request, res: Response) {

        const getFullTurmasUseCase = new GetFullTurmasUseCase();

        const result = await getFullTurmasUseCase.execute();

        return res.status(201).json(result);
    }
}

export class GetFullEstagiosController {
    async handle(req: Request, res: Response) {

        const getFullEstagiosUseCase = new GetFullEstagiosUseCase();

        const result = await getFullEstagiosUseCase.execute();

        return res.status(201).json(result);
    }
}

export class GetFullFuncionariosController {
    async handle(req: Request, res: Response) {

        const getFullFuncionariosUseCase = new GetFullFuncionariosUseCase();

        const result = await getFullFuncionariosUseCase.execute();

        return res.status(201).json(result);
    }
}

export class GetFullCursosController {
    async handle(req: Request, res: Response) {

        const getFullCursosUseCase = new GetFullCursosUseCase();

        const result = await getFullCursosUseCase.execute();

        return res.status(201).json(result);
    }
}