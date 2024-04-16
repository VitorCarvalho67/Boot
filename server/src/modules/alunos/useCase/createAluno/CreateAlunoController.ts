import { Request, Response} from 'express';
import { CreateAlunoUseCase } from './CreateAlunoUseCase';

export class CreateAlunoController {
    async handle(req: Request, res: Response){
        const { email, token } = req.body;

        const createAlunoUseCase = new CreateAlunoUseCase();

        const result = await createAlunoUseCase.execute({ email, token });

        return res.status(201).json(result);
    }
}