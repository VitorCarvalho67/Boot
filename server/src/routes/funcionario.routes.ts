import { Router } from "express";
import { ValidateFuncionarioController } from "../modules/funcionario/useCase/validateFuncionario/ValidateFuncionarioController";
import { LoginFuncionarioController } from "../modules/funcionario/useCase/loginFuncionario/LoginFuncionarioController";
import { InitFuncionarioController } from "../modules/funcionario/useCase/initFuncionario/InitFuncionarioController";
// import { funcionarioAuthMiddleware } from '../middleware/autentication';

const validateFuncionarioController = new ValidateFuncionarioController();
const loginFuncionarioController = new LoginFuncionarioController();
const initFuncionarioController = new InitFuncionarioController();

const funcionarioRoutes = Router();

funcionarioRoutes.post("/validate", validateFuncionarioController.handle);
funcionarioRoutes.post("/login", loginFuncionarioController.handle);

// funcionarioRoutes.post("/auth", funcionarioAuthMiddleware, (req, res) => {
    //     res.status(200).send("Funcionario autenticado com sucesso.");
    // });
    
funcionarioRoutes.get("/init", initFuncionarioController.handle);

export { funcionarioRoutes };