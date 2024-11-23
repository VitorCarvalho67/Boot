import { Request, Response } from "express";
import { CreateVinculoUseCase } from "../services/shared/CreateVinculoUseCase";
import { DeleteVinculoUseCase } from "../services/shared/DeleteVinculoUseCase";
import { AcceptVinculoUseCase } from "../services/shared/AcceptVinculoUseCase";
import { GetVinculosUseCase } from "../services/shared/GetVinculosUseCase";
import { GetVinculosProfileUseCase } from "../services/shared/GetProfileVincUseCase";
import { IgnoreVinculoUseCase } from "../services/shared/IgnoreVinculoUseCase";
import { GetUnlinkedsUseCase } from "../services/shared/GetUnlinkedsUseCase";
import { GetCursosUseCase } from "../services/shared/GetCursosUseCase";
import { GetCurriculoUseCase } from "../services/shared/GetCurriculoUseCase";
import { GetProfileImageUseCase } from '../services/shared/GetProfileImageUseCase';
import { GetBannerUseCase } from '../services/shared/GetBannerUseCase';
import { CreateMessageUseCase } from "../services/shared/CreateMessageUseCase";

import { 
    CreateMessageDTO,
    GetEntidadeDTO,
    IdentificadorEnum
} from "../interfaces/sharedDTOs";
import { SearchUsersUseCase } from "../services/shared/GetProfilesUseCase";
import { GetEmpresasUseCase } from "../services/shared/GetEmpresasUseCase";
import { GetVagasUseCase } from "../services/shared/GetVagasUseCase";
import { GetVagaUseCase } from "../services/shared/GetVagaUseCase";
import { GetExtracurricularsByRMUseCase } from "../services/shared/GetExtraUseCase";
import { GetRankingUseCase } from "../services/shared/GetRanking";
import { GetEmpresaUseCase } from "../services/empresa/GetEmpresaUseCase";

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
        const identifier = req.query.identifier as IdentificadorEnum;

        const getVinculosUseCase = new GetVinculosUseCase();

        const result = await getVinculosUseCase.execute({ email, identifier });

        return res.status(201).json(result);
    }
}

export class GetVinculosProfileController {
    async handle(req: Request, res: Response) {
        const email = req.body.entidade.email;
        const identifier = req.query.identifier as IdentificadorEnum;

        const getVinculosProfileUseCase = new GetVinculosProfileUseCase();

        const result = await getVinculosProfileUseCase.execute({ email, identifier });

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

export class GetEmpresasController {
    async handle(req: Request, res: Response) {

        const getEmpresasUseCase = new GetEmpresasUseCase();

        const result = await getEmpresasUseCase.execute();

        return res.status(201).json(result);
    }
}

export class GetVagasController {
    async handle(req: Request, res: Response) {

        const getVagasUseCase = new GetVagasUseCase();

        const result = await getVagasUseCase.execute();

        return res.status(201).json(result);
    }
}

export class GetVagaController {
    async handle(req: Request, res: Response) {
        const id = req.query.id;
        const getVagaUseCase = new GetVagaUseCase();

        const result = await getVagaUseCase.execute(id as string);

        return res.status(201).json(result);
    }
}

export class GetCurriculoController {
    async handle(req: Request, res: Response) {
        const { rm } = req.query as { rm: string };

        const getCurriculoUseCase = new GetCurriculoUseCase();

        const result = await getCurriculoUseCase.execute(rm);

        return res.status(201).json(result);
    }
}

export class GetProfileImageController {
    async handle(req: Request, res: Response) {
        const { email, identifier } = req.query as unknown as GetEntidadeDTO;

        const getProfileImageUseCase = new GetProfileImageUseCase();

        const result = await getProfileImageUseCase.execute({ email, identifier });

        return res.status(201).json(result);
    }
}

export class GetBannerController {
    async handle(req: Request, res: Response) {
        const { email, identifier } = req.query as unknown as GetEntidadeDTO;

        const getBannerUseCase = new GetBannerUseCase();

        const result = await getBannerUseCase.execute({ email, identifier });

        return res.status(201).json(result);
    }
}

export class CreateMessageController {
    async handle(req: Request, res: Response) {
        const sender = req.body.entidade.email;
        const { message, recipient, senderIdentifier, recipientIdentifier } = req.body;

        const createMessageUseCase = new CreateMessageUseCase();

        const result = await createMessageUseCase.execute({ message, sender, recipient, senderIdentifier, recipientIdentifier });

        return res.status(201).json(result);
    }
}

export class SearchUserController {
    async handle(req: Request, res: Response) {
        const searchUsersUseCase = new SearchUsersUseCase();

        const result = await searchUsersUseCase.execute();

        return res.status(201).json(result);
    }
}

export class GetExtracurricularsByRMController {
    async handle(req: Request, res: Response) {
        const rm = req.query.rm as string;

        const getExtracurricularsByRMUseCase = new GetExtracurricularsByRMUseCase();

        const result = await getExtracurricularsByRMUseCase.execute(rm);

        return res.status(201).json(result);
    }
}

export class GetRankingController {
    async handle(req: Request, res: Response) {
        const getRankingUseCase = new GetRankingUseCase();

        const result = await getRankingUseCase.execute();

        return res.status(201).json(result);
    }
}

export class GetEmpresaController {
    async handle(req: Request, res: Response) {
        const email = req.query.email as string;

        const getEmpresaUseCase = new GetEmpresaUseCase();

        const result = await getEmpresaUseCase.execute(email);

        return res.status(201).json(result);
    }
}