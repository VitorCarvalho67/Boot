import { Request, Response } from "express";
import { RegisterEmpresaUseCase } from '../services/empresa/registerEmpresaUseCase';

export class RegisterEmpresaController {
    async handle(req: Request, res: Response){
        const { name, email, cnpj, password } = req.body;

        const registerEmpresaController = new RegisterEmpresaUseCase();

        const result = await registerEmpresaController.execute({ name, email, cnpj, password });

        return res.status(201).json(result);
    }
}