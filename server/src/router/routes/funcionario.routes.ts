import { Router } from "express";
import { funcionarioAuthMiddleware } from '../../middleware/auth/autentication';
import {
    ValidateFuncionarioController,
    LoginFuncionarioController,
    InitFuncionarioController,
    RecoveryFuncionarioController,
    ValidateRecoveryController,
    RefreshTokenController
} from "../../modules/controllers/funcionarioControllers";

const createControllers = () => ({
    validateFuncionarioController: new ValidateFuncionarioController(),
    loginFuncionarioController: new LoginFuncionarioController(),
    initFuncionarioController: new InitFuncionarioController(),
    recoveryFuncionarioController: new RecoveryFuncionarioController(),
    validateRecoveryController: new ValidateRecoveryController(),
    refreshTokenController: new RefreshTokenController()
});

const controllers = createControllers();
const funcionarioRoutes = Router();

funcionarioRoutes.post("/validate", controllers.validateFuncionarioController.handle);
funcionarioRoutes.post("/login", controllers.loginFuncionarioController.handle);
funcionarioRoutes.post("/recovery", controllers.recoveryFuncionarioController.handle);
funcionarioRoutes.post("/recovery/validate", controllers.validateRecoveryController.handle);


funcionarioRoutes.get("/auth", funcionarioAuthMiddleware, (req, res) => {
    res.status(200).send("Funcionário autenticado com sucesso.");
});

funcionarioRoutes.get("/init", controllers.initFuncionarioController.handle);
funcionarioRoutes.get("/token/refresh", funcionarioAuthMiddleware, controllers.refreshTokenController.handle);

export { funcionarioRoutes };