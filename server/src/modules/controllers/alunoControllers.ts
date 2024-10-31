import { Request, Response } from 'express';
import { ValidateAlunoUseCase } from '../services/aluno/ValidateAlunoUseCase';
import { CreateAlunoUseCase } from '../services/aluno/CreateAlunoUseCase';
import { LoginAlunoUseCase } from "../services/aluno/LoginAlunoUseCase";
import { RecoveryAluno } from "../services/aluno/RecoveryAlunoUseCase";
import { ValidateRecoveryUseCase } from "../services/aluno/ValidateRecoveryUseCase";
import { CompleteAlunoUseCase } from "../services/aluno/CompleteRegisterUseCase";
import { UpdateCurriculoUseCase } from "../services/aluno/UpdateCurriculoUseCase";
import { GetTurmasByCursoUseCase } from "../services/aluno/GetCourseYearUseCase";
import { GetCurriculoUseCase } from "../services/aluno/GetCurriculoUseCase";
import { GetMeUseCase } from '../services/aluno/GetMeUseCase';
import { RefreshTokenUseCase } from '../services/aluno/RefreshTokenUseCase';
import { UploadProfileUseCase } from '../services/aluno/UploadProfileUseCase';
import { UploadCapaUseCase } from '../services/aluno/UploadCapaUseCase';
import { ChangePassUseCase } from '../services/aluno/ChangePassUseCase';
import { Turno } from "../interfaces/alunoDTOs"
import { GetLastMessagesUseCase } from '../services/shared/GetMessagesUseCase';
import { EntidadeEnum, IdentificadorEnum } from '../interfaces/sharedDTOs';
import { GetMessagesBetweenUseCase } from '../services/shared/GetChatUseCase';
import { CreateMessageUseCase } from '../services/shared/CreateMessageUseCase';
import { RegisterExtracurricularUseCase } from '../services/aluno/CreateExtraUseCase';
import { EditExtracurricularUseCase } from '../services/aluno/EditExtraUsecase';
import { ExcludeExtracurricularUseCase } from '../services/aluno/ExcludeExtraUseCase';
import { SendBoletimUseCase } from '../services/aluno/SendBoletimUseCase';
import { GetExtracurricularsByEmailUseCase } from '../services/aluno/GetExtracurricularesUseCase';
import { GenerateCurriculumUseCase } from '../services/aluno/GenerateCurriculumUseCase';

export class CreateAlunoController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const createAlunoUseCase = new CreateAlunoUseCase();

        const result = await createAlunoUseCase.execute({ name, email, password });

        return res.status(201).json(result);
    }
}

export class ValidateAlunoController {
    async handle(req: Request, res: Response) {
        const { email, token } = req.body;

        const validateAlunoUseCase = new ValidateAlunoUseCase();

        const result = await validateAlunoUseCase.execute({ email, token });

        return res.status(201).json(result);
    }
}

export class LoginAlunoController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const loginAlunoUseCase = new LoginAlunoUseCase();

        const result = await loginAlunoUseCase.execute({ email, password });

        return res.status(201).json(result);
    }
}

export class RecoveryAlunoController {
    async handle(req: Request, res: Response) {
        const { name, email } = req.body;

        const loginAlunoUseCase = new RecoveryAluno();

        const result = await loginAlunoUseCase.execute({ name, email });

        return res.status(201).json(result);
    }
}

export class ValidateRecoveryController {
    async handle(req: Request, res: Response) {
        const { email, recoveryPassword, newPass } = req.body;

        const validateRecovery = new ValidateRecoveryUseCase();

        const result = await validateRecovery.execute({ email, recoveryPassword, newPass });

        return res.status(201).json(result);
    }
}

export class CompleteAlunoController {
    async handle(req: Request, res: Response) {
        const { nascimento, endereco, curso, inicio, rm, telefone } = req.body;
        const email = req.body.entidade.email;

        const completeAluno = new CompleteAlunoUseCase();

        const result = await completeAluno.execute({ email, nascimento, endereco, curso, inicio, rm, telefone });

        return res.status(201).json(result);
    }
}

export class UpdateCurriculoController {
    async handle(req: Request, res: Response) {
        const { curriculo } = req.body;
        const email = req.body.entidade.email;

        const updateCurriculo = new UpdateCurriculoUseCase();

        const result = await updateCurriculo.execute({ email, curriculo });

        return res.status(201).json(result);
    }
}

export class GetCourseYearController {
    async handle(req: Request, res: Response) {
        const { curso, turno } = req.query as { curso: string; turno: Turno };

        const getTurmasByCursoUseCase = new GetTurmasByCursoUseCase();

        const result = await getTurmasByCursoUseCase.execute({ curso, turno });

        return res.status(201).json(result);
    }
}

export class GetCurriculoController {
    async handle(req: Request, res: Response) {
        const email = req.body.entidade.email;

        const getCurriculoUseCase = new GetCurriculoUseCase();

        const result = await getCurriculoUseCase.execute(email);

        return res.status(201).json(result);
    }
}

export class GetMeController {
    async handle(req: Request, res: Response) {
        const email = req.body.entidade.email;

        const getMeUseCase = new GetMeUseCase();

        const result = await getMeUseCase.execute(email);


        return res.status(201).json(result);
    }
}

export class RefreshTokenController {
    async handle(req: Request, res: Response) {
        const email = req.body.entidade.email;

        const refreshTokenUseCase = new RefreshTokenUseCase();

        const result = await refreshTokenUseCase.execute(email);

        return res.status(201).json(result);
    }
}

export class UploadImgProfileController {
    async handle(req: Request, res: Response) {
        const email = req.body.entidade.email;
        const file = req.file as Express.Multer.File;

        const uploadProfileUseCase = new UploadProfileUseCase();

        const result = await uploadProfileUseCase.execute({ email, file });

        return res.status(201).json(result);
    }
}

export class UploadCapaController {
    async handle(req: Request, res: Response) {
        const email = req.body.entidade.email;
        const file = req.file as Express.Multer.File;

        const uploadCapaUseCase = new UploadCapaUseCase();

        const result = await uploadCapaUseCase.execute({ email, file });

        return res.status(201).json(result);
    }
}

export class ChangePassController {
    async handle(req: Request, res: Response) {
        const { email, oldPass, newPass } = req.body;

        const changePassUseCase = new ChangePassUseCase();

        const result = await changePassUseCase.execute({ email, oldPass, newPass });

        return res.status(201).json(result);
    }
}

export class GetLastMessagesController {
    async handle(req: Request, res: Response) {
        const email = req.body.entidade.email;
        const identifier = "ALUNO" as IdentificadorEnum;

        const getLastMessagesUseCase = new GetLastMessagesUseCase();

        const result = await getLastMessagesUseCase.execute({ email, identifier });

        return res.status(201).json(result);
    }
}

export class GetMessagesBetweenController {
    async handle(req: Request, res: Response) {
        const email1 = req.body.entidade.email as string;
        const identifier1 = "ALUNO" as EntidadeEnum;

        const email2 = req.query.email2 as string;
        const identifier2 = req.query.identifier2 as EntidadeEnum;

        if (!email2 || !identifier2) {
            return res.status(400).json({ error: "Parâmetros insuficientes ou inválidos." });
        }

        const getMessagesBetween = new GetMessagesBetweenUseCase();

        const result = await getMessagesBetween.execute({ email1, identifier1, email2, identifier2 });

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

export class RegisterExtracurricularController {
    async handle(req: Request, res: Response) {
        const alunoId = req.body.entidade.id;
        const { instituicao, descricao, inicio, fim } = req.body;

        const registerExtracurricularUseCase = new RegisterExtracurricularUseCase();

        const result = await registerExtracurricularUseCase.execute({
            alunoId,
            instituicao,
            descricao,
            inicio,
            fim,
        });

        return res.status(201).json(result);
    }
}

export class EditExtracurricularController {
    async handle(req: Request, res: Response) {
        const { instituicao, descricao, inicio, fim } = req.body;
        const extracurricularId = req.body.extracurricularId;
        const alunoId = req.body.entidade.id;

        const editExtracurricularUseCase = new EditExtracurricularUseCase();

        const result = await editExtracurricularUseCase.execute({
            extracurricularId,
            alunoId,
            instituicao,
            descricao,
            inicio,
            fim,
        });

        return res.status(200).json(result);
    }
}

export class ExcludeExtracurricularController {
  async handle(req: Request, res: Response) {
    const extracurricularId = req.body.extracurricularId;
    const alunoId = req.body.entidade.id;

    const excludeExtracurricularUseCase = new ExcludeExtracurricularUseCase();

    const result = await excludeExtracurricularUseCase.execute({
      extracurricularId,
      alunoId,
    });

    return res.status(200).json(result);
  }
}

export class SendBoletimController {
    async handle(req: Request, res: Response) {
        const alunoId = req.body.entidade.id;
        const boletim = req.file as Express.Multer.File;

        const sendBoletimUseCase = new SendBoletimUseCase();

        const result = await sendBoletimUseCase.execute({ alunoId, boletim });

        return res.status(201).json(result);
    }
}

export class GetExtracurricularesController {
    async handle(req: Request, res: Response) {
        const email = req.body.entidade.email as string;

        const getExtracurricularsByEmailUseCase = new GetExtracurricularsByEmailUseCase();

        const result = await getExtracurricularsByEmailUseCase.execute(email);

        return res.status(201).json(result);
    }
}

export class GenerateCurriculumController {
    async handle(req: Request, res: Response) {
        const email = req.body.entidade.email as string;

        const generateCurriculumUseCase = new GenerateCurriculumUseCase();

        const result = await generateCurriculumUseCase.execute(email);

        return res.status(201).json(result);
    }
}