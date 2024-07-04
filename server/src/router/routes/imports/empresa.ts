import {
    RegisterEmpresaController,
    ValidateEmpresaController,
    LoginEmpresaController,
    RecoveryEmpresaController,
    ValidateRecoveryEmpresaController,
    RefreshTokenController
} from "../../../modules/controllers/empresaControllers";

export const createControllers = () => ({
    registerEmpresaController: new RegisterEmpresaController(),
    validateEmpresaController: new ValidateEmpresaController(),
    loginEmpresaController: new LoginEmpresaController(),
    recoveryEmpresaController: new RecoveryEmpresaController(),
    validateRecoveryEmpresaController: new ValidateRecoveryEmpresaController(),
    refreshTokenController: new RefreshTokenController()
});