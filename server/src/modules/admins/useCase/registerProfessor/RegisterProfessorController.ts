import { Request, Response} from 'express';
import { RegisterProfessorUseCase } from './RegisterProfessorUseCase';

export class RegisterProfessorController {
    async handle(req: Request, res: Response){
        const { name, email, password, tituloPrincipal } = req.body;

        const registerProfessorUseCase = new RegisterProfessorUseCase();

        const result = await registerProfessorUseCase.execute({ name, email, password, tituloPrincipal });

        return res.status(201).json(result);
    }
}