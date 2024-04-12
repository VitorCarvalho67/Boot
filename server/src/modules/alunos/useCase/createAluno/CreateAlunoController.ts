import { Request, Response} from 'express';
import { CreateAlunoUseCase } from './CreateAlunoUseCase';

export class CreateAlunoController {
    async handle(req: Request, res: Response){
        const { name, email, password} = req.body;

        const createAlunoUseCase = new CreateAlunoUseCase();

        const result = await createAlunoUseCase.execute({name, email, password});

        return res.status(201).json(result);
    }
}