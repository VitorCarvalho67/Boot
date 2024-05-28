import { Request, Response } from "express";
import { CreateVinculoUseCase } from "../services/shared/CreateVinculoUseCase";
import { DeleteVinculoUseCase } from "../services/shared/DeleteVinculoUseCase";
import { AcceptVinculoUseCase } from "../services/shared/AcceptVinculoUseCase";
import { GetVinculosUseCase } from "../services/shared/GetVinculosUseCase";
import { IgnoreVinculoUseCase } from "../services/shared/IgnoreVinculoUseCase";
import { GetUnlinkedsUseCase } from "../services/shared/GetUnlinkedsUseCase";
import { GetCursosUseCase } from "../services/shared/GetCursosUseCase";

export class CreateVinculoController {
    async handle(req: Request, res: Response) {
        const { sender, recipient, senderIdentifier, recipientIdentifier } = req.body;
        const email = req.body.entidade.email;

        const createVinculoUseCase = new CreateVinculoUseCase();

        const result = await createVinculoUseCase.execute({ email, sender, recipient, senderIdentifier, recipientIdentifier });

        return res.status(201).json(result);
    }
}

export class DeleteVinculoController {
    async handle(req: Request, res: Response) {
        const { sender, recipient, senderIdentifier, recipientIdentifier } = req.body;
        const email = req.body.entidade.email;

        const deleteVinculoUseCase = new DeleteVinculoUseCase();

        const result = await deleteVinculoUseCase.execute({ email, sender, recipient, senderIdentifier, recipientIdentifier });

        return res.status(201).json(result);
    }
}

export class AcceptVinculoController {
    async handle(req: Request, res: Response) {
        const sender = req.body.sender;
        const recipient = req.body.recipient;
        const senderIdentifier = req.body.senderIdentifier;
        const recipientIdentifier = req.body.recipientIdentifier;
        const email = req.body.entidade.email;

        const acceptVinculoUseCase = new AcceptVinculoUseCase();

        const result = await acceptVinculoUseCase.execute({ email, sender, recipient, senderIdentifier, recipientIdentifier });

        return res.status(201).json(result);
    }
}

export class IgnoreVinculoController {
    async handle(req: Request, res: Response) {
        const sender = req.body.sender;
        const recipient = req.body.recipient;
        const senderIdentifier = req.body.senderIdentifier;
        const recipientIdentifier = req.body.recipientIdentifier;
        const email = req.body.entidade.email;

        const ignoreVinculoUseCase = new IgnoreVinculoUseCase();

        const result = await ignoreVinculoUseCase.execute({ email, sender, recipient, senderIdentifier, recipientIdentifier });

        return res.status(201).json(result);
    }
}

export class GetVinculosController {
    async handle(req: Request, res: Response) {
        const email = req.body.entidade.email;
        const identifier = req.body.identifier;

        const getVinculosUseCase = new GetVinculosUseCase();
        
        const result = await getVinculosUseCase.execute({ email, identifier });

        return res.status(201).json(result);
    }
}

export class GetUnlinkedsController {
    async handle(req: Request, res: Response) {
        const email = req.body.entidade.email;
        const identifier = req.body.identifier;

        const getUnlinkedsUseCase = new GetUnlinkedsUseCase();
        
        const result = await getUnlinkedsUseCase.execute({ email, identifier });

        return res.status(201).json(result);
    }
}


export class GetCursosController {
    async handle(req: Request, res: Response) {

        const getCursoUseCase = new GetCursosUseCase();

        const result = await getCursoUseCase.execute();

        return res.status(201).json(result);
    }
}