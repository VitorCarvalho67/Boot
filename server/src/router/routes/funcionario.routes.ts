import { Router } from "express";
// import { funcionarioAuthMiddleware } from '../middleware/autentication';
import { 
    ValidateFuncionarioController,
    LoginFuncionarioController,
    InitFuncionarioController
} from "../../modules/controllers/funcionarioControllers";

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