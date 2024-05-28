import { Router } from "express";
import { funcionarioAuthMiddleware } from '../../middleware/auth/autentication';
import {
    ValidateFuncionarioController,
    LoginFuncionarioController,
    InitFuncionarioController,
    RecoveryFuncionarioController,
    ValidateRecoveryController
} from "../../modules/controllers/funcionarioControllers";

const validateFuncionarioController = new ValidateFuncionarioController();
const loginFuncionarioController = new LoginFuncionarioController();
const initFuncionarioController = new InitFuncionarioController();
const recoveryFuncionarioController = new RecoveryFuncionarioController();
const validateRecoveryController = new ValidateRecoveryController();

const funcionarioRoutes = Router();

funcionarioRoutes.post("/validate", validateFuncionarioController.handle);
funcionarioRoutes.post("/login", loginFuncionarioController.handle);
funcionarioRoutes.post("/recovery", recoveryFuncionarioController.handle);
funcionarioRoutes.post("/recovery/validate", validateRecoveryController.handle);


funcionarioRoutes.get("/auth", funcionarioAuthMiddleware, (req, res) => {
    res.status(200).send("Funcionário autenticado com sucesso.");
});

funcionarioRoutes.get("/init", initFuncionarioController.handle);

export { funcionarioRoutes };