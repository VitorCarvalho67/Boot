import { Request, Response} from 'express';
import { CreatePreAlunoUseCase } from './CreatePreAlunoUseCase';

export class CreatePreAlunoController {
    async handle(req: Request, res: Response){
        const { name, email, password} = req.body;

        const createAlunoUseCase = new CreatePreAlunoUseCase();

        const result = await createAlunoUseCase.execute({name, email, password});

        return res.status(201).json(result);
    }
}