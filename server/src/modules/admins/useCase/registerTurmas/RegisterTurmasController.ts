import { Request, Response} from 'express';
import { RegisterTurmasUseCase } from './RegisterTurmasUseCase';

export class RegisterTurmaController {
    async handle(req: Request, res: Response){
        const { inicio, fim, cursoName } = req.body;

        const registerTurmaUseCase = new RegisterTurmasUseCase();

        const result = await registerTurmaUseCase.execute({ inicio, fim, cursoName });

        return res.status(201).json(result);
    }
}