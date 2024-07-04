import {
    ValidateFuncionarioController,
    LoginFuncionarioController,
    InitFuncionarioController,
    RecoveryFuncionarioController,
    ValidateRecoveryController,
    RefreshTokenController
} from "../../../modules/controllers/funcionarioControllers";

export const createControllers = () => ({
    validateFuncionarioController: new ValidateFuncionarioController(),
    loginFuncionarioController: new LoginFuncionarioController(),
    initFuncionarioController: new InitFuncionarioController(),
    recoveryFuncionarioController: new RecoveryFuncionarioController(),
    validateRecoveryController: new ValidateRecoveryController(),
    refreshTokenController: new RefreshTokenController()
});