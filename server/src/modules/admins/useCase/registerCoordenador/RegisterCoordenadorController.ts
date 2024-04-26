import { Request, Response} from 'express';
import { RegisterCoordenadorUseCase } from './RegisterCoordenadorUseCase';

export class RegisterCoordenadorController {
    async handle(req: Request, res: Response){
        const { name } = req.body;

        const registerControllerUseCase = new RegisterCoordenadorUseCase();

        const result = await registerControllerUseCase.execute({ name });

        return res.status(201).json(result);
    }
}