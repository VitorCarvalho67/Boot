import { Request, Response} from 'express';
import { RegisterFuncionarioUseCase } from './RegisterFuncionarioUseCase';

export class RegisterFuncionarioController {
    async handle(req: Request, res: Response){
        const { name, email, password, cargo } = req.body;

        const registerFuncionarioUseCase = new RegisterFuncionarioUseCase();

        const result = await registerFuncionarioUseCase.execute({ name, email, password, cargo });

        return res.status(201).json(result);
    }
}