import {
    CreateVinculoController,
    AcceptVinculoController,
    GetVinculosController,
    IgnoreVinculoController,
    GetUnlinkedsController,
    DeleteVinculoController,
    CreateMessageController
} from "../../../modules/controllers/sharedControllers";
import {
    ValidateProfessorController,
    LoginProfessorController,
    InitProfessorController,
    RecoveryProfessorController,
    ValidateRecoveryController,
    RefreshTokenController,
    CreateActivityController,
    RelateAlunoAtividadeController
} from "../../../modules/controllers/professorControllers";

export const createControllers = () => ({
    validateProfessorController: new ValidateProfessorController(),
    loginProfessorController: new LoginProfessorController(),
    initProfessorController: new InitProfessorController(),
    recoveryProfessorController: new RecoveryProfessorController(),
    validateRecoveryController: new ValidateRecoveryController(),
    createVinculoController: new CreateVinculoController(),
    acceptVinculoController: new AcceptVinculoController(),
    ignoreVinculoController: new IgnoreVinculoController(),
    deleteVinculoController: new DeleteVinculoController(),
    getVinculosController: new GetVinculosController(),
    getUnlinkedsController: new GetUnlinkedsController(),
    refreshTokenController: new RefreshTokenController(),
    createMessageController: new CreateMessageController(),
    createActivityController: new CreateActivityController(),
    relateAlunoAtividadeController :new RelateAlunoAtividadeController(),
});