import { Router } from "express";
import { funcionarioAuthMiddleware } from '../../middleware/auth/autentication';
import { createControllers } from "./imports/funcionario";

const controllers = createControllers();
const funcionarioRoutes = Router();

funcionarioRoutes.post("/validate", controllers.validateFuncionarioController.handle);
funcionarioRoutes.post("/login", controllers.loginFuncionarioController.handle);
funcionarioRoutes.post("/recovery", controllers.recoveryFuncionarioController.handle);
funcionarioRoutes.post("/recovery/validate", controllers.validateRecoveryController.handle);

funcionarioRoutes.get("/init", controllers.initFuncionarioController.handle);

funcionarioRoutes.use(funcionarioAuthMiddleware);
funcionarioRoutes.post("/register/vaga", controllers.registerVagaController.handle);
funcionarioRoutes.post("/update/empresa", controllers.registerVagaController.handle);
funcionarioRoutes.post("/message/send", controllers.createMessageController.handle);
funcionarioRoutes.post("/boletim/compare", controllers.compareBoletimController.handle);

funcionarioRoutes.get("/auth", (req, res) => {
    res.status(200).send("Funcionário autenticado com sucesso.");
});

funcionarioRoutes.get("/token/refresh", controllers.refreshTokenController.handle);
funcionarioRoutes.get("/cursos", controllers.getCursosController.handle);
funcionarioRoutes.get("/empresas", controllers.getEmpresasController.handle);
funcionarioRoutes.get("/messages/between", controllers.getMessagesBetweenController.handle);
funcionarioRoutes.get("/boletins", controllers.getBoletinsEmAnaliseController.handle);


export { funcionarioRoutes };