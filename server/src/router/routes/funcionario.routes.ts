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

const validateFuncionarioController = new ValidateFuncionarioController();
const loginFuncionarioController = new LoginFuncionarioController();
const initFuncionarioController = new InitFuncionarioController();
const recoveryFuncionarioController = new RecoveryFuncionarioController();
const validateRecoveryController = new ValidateRecoveryController();
const refreshTokenController = new RefreshTokenController();

const funcionarioRoutes = Router();

funcionarioRoutes.post("/validate", validateFuncionarioController.handle);
funcionarioRoutes.post("/login", loginFuncionarioController.handle);
funcionarioRoutes.post("/recovery", recoveryFuncionarioController.handle);
funcionarioRoutes.post("/recovery/validate", validateRecoveryController.handle);


funcionarioRoutes.get("/auth", funcionarioAuthMiddleware, (req, res) => {
    res.status(200).send("Funcionário autenticado com sucesso.");
});

funcionarioRoutes.get("/init", initFuncionarioController.handle);
funcionarioRoutes.get("/token/refresh", funcionarioAuthMiddleware, refreshTokenController.handle);

export { funcionarioRoutes };