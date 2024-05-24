import { Request, Response } from "express";
import { CreateVinculoUseCase } from "../services/shared/CreateVinculoUseCase";
import { AcceptVinculoUseCase } from "../services/shared/AcceptVinculoUseCase";

export class CreateVinculoController {
    async handle(req: Request, res: Response) {
        const { email1, email2, identifier1, identifier2 } = req.body;

        const createVinculoUseCase = new CreateVinculoUseCase();

        const result = await createVinculoUseCase.execute({ email1, email2, identifier1, identifier2 });

        return res.status(201).json(result);
    }
}

export class AcceptVinculoController {
    async handle(req: Request, res: Response) {
        const { email1, email2, identifier1, identifier2 } = req.body;

        const acceptVinculoUseCase = new AcceptVinculoUseCase();

        const result = await acceptVinculoUseCase.execute({ email1, email2, identifier1, identifier2 });

        return res.status(201).json(result);
    }
}