import { Request, Response} from 'express';
import { RegisterCursosUseCase } from './RegisterCursosUseCase';

export class RegisterCursosController {
    async handle(req: Request, res: Response){
        const { cursoName, turno, duracao, coordenador } = req.body;

        const registerCursosUseCase = new RegisterCursosUseCase();

        const result = await registerCursosUseCase.execute({ cursoName, turno, duracao, coordenador });

        return res.status(201).json(result);
    }
}