import { Request, Response } from "express";
import { GetAllProfessorUseCase } from "../services/admin/GetAllProfessorUseCase";
import { GetCoordenadorUseCase } from "../services/admin/GetCoordenadoresUseCase";
import { GetCursosUseCase } from "../services/admin/GetCursosUseCase";
import { LoginAdminUseCase } from "../services/admin/LoginAdminUseCase";
import { RegisterCoordenadorUseCase } from '../services/admin/RegisterCoordenadorUseCase';
import { RegisterCursosUseCase } from '../services/admin/RegisterCursosUseCase';
import { RegisterFuncionarioUseCase } from '../services/admin/RegisterFuncionarioUseCase';
import { RegisterProfessorUseCase } from '../services/admin/RegisterProfessorUseCase';
import { RegisterTurmasUseCase } from '../services/admin/RegisterTurmasUseCase';

export class GetAllProfessorController {
    async handle(req: Request, res: Response) {

        const getAllProfessorUseCase = new GetAllProfessorUseCase();

        const result = await getAllProfessorUseCase.execute();

        return res.status(201).json(result);
    }
}


export class GetCoordenadorController {
    async handle(req: Request, res: Response) {

        const getCoordenadorUseCase = new GetCoordenadorUseCase();

        const result = await getCoordenadorUseCase.execute();

        return res.status(201).json(result);
    }
}


export class GetCursosController {
    async handle(req: Request, res: Response) {

        const getCursoUseCase = new GetCursosUseCase();

        const result = await getCursoUseCase.execute();

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