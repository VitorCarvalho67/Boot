import {
    ValidateFuncionarioController,
    LoginFuncionarioController,
    InitFuncionarioController,
    RecoveryFuncionarioController,
    ValidateRecoveryController,
    RefreshTokenController,
    RegisterVagaController,
    FuncionarioController,
    GetMessagesBetweenController,
    CompareBoletimController,
    GetBoletinsEmAnaliseController
} from "../../../modules/controllers/funcionarioControllers";
import { 
    GetCursosController,
    GetEmpresasController,
    CreateMessageController
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
    getEmpresasController: new GetEmpresasController(),
    funcionarioController: new FuncionarioController(),
    createMessageController: new CreateMessageController(),
    getMessagesBetweenController: new GetMessagesBetweenController(),
    compareBoletimController: new CompareBoletimController(),
    getBoletinsEmAnaliseController: new GetBoletinsEmAnaliseController(),
});