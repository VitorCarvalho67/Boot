import {
    RegisterEmpresaController,
    ValidateEmpresaController,
    LoginEmpresaController,
    RecoveryEmpresaController,
    ValidateRecoveryEmpresaController,
    RefreshTokenController,
    GetMessagesBetweenController
} from "../../../modules/controllers/empresaControllers";
import {
    CreateMessageController,
} from "../../../modules/controllers/sharedControllers";

export const createControllers = () => ({
    registerEmpresaController: new RegisterEmpresaController(),
    validateEmpresaController: new ValidateEmpresaController(),
    loginEmpresaController: new LoginEmpresaController(),
    recoveryEmpresaController: new RecoveryEmpresaController(),
    validateRecoveryEmpresaController: new ValidateRecoveryEmpresaController(),
    refreshTokenController: new RefreshTokenController(),
    createMessageController: new CreateMessageController(),
    getMessagesBetweenController: new GetMessagesBetweenController(),
});