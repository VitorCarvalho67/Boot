import {
    ValidateFuncionarioController,
    LoginFuncionarioController,
    InitFuncionarioController,
    RecoveryFuncionarioController,
    ValidateRecoveryController,
    RefreshTokenController,
    RegisterVagaController
} from "../../../modules/controllers/funcionarioControllers";
import { 
    GetCursosController,
    GetEmpresasController
} from "../../../modules/controllers/sharedControllers";

export const createControllers = () => ({
    validateFuncionarioController: new ValidateFuncionarioController(),
    loginFuncionarioController: new LoginFuncionarioController(),
    initFuncionarioController: new InitFuncionarioController(),
    recoveryFuncionarioController: new RecoveryFuncionarioController(),
    validateRecoveryController: new ValidateRecoveryController(),
    refreshTokenController: new RefreshTokenController(),
    registerVagaController: new RegisterVagaController(),
    getCursosController: new GetCursosController(),
    getEmpresasController: new GetEmpresasController()
});