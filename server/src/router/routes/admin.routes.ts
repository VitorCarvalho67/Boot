import { Router } from "express";
import { adminAuthMiddleware } from '../../middleware/auth/autentication';
import {
    GetCursosController
} from "../../modules/controllers/sharedControllers"
import {
    LoginAdminController,
    RegisterCursosController,
    RegisterProfessorController,
    RegisterFuncionarioController,
    RegisterCoordenadorController,
    GetAllProfessorController,
    GetCoordenadorController,
    RegisterTurmaController,
    RefreshTokenController
} from "../../modules/controllers/adminControllers";

const createControllers = () => ({
    loginAdminController: new LoginAdminController(),
    registerCursosController: new RegisterCursosController(),
    registerProfessorController: new RegisterProfessorController(),
    registerFuncionarioController: new RegisterFuncionarioController(),
    registerCoordenadorController: new RegisterCoordenadorController(),
    registerTurmaController: new RegisterTurmaController(),
    getAllProfessorController: new GetAllProfessorController(),
    getCoordenadoresController: new GetCoordenadorController(),
    getCursosController: new GetCursosController(),
    refreshTokenController: new RefreshTokenController(),
});

const controllers = createControllers();
const adminRoutes = Router();

adminRoutes.post("/login", controllers.loginAdminController.handle);
adminRoutes.post("/register/course", adminAuthMiddleware, controllers.registerCursosController.handle);
adminRoutes.post("/register/professor", adminAuthMiddleware, controllers.registerProfessorController.handle);
adminRoutes.post("/register/funcionario", adminAuthMiddleware, controllers.registerFuncionarioController.handle);
adminRoutes.post("/register/coordenador", adminAuthMiddleware, controllers.registerCoordenadorController.handle);
adminRoutes.post("/register/turma", adminAuthMiddleware, controllers.registerTurmaController.handle);

adminRoutes.get("/auth", adminAuthMiddleware, (req, res) => {
    res.status(200).send("Admin autenticado com sucesso.");
});

adminRoutes.get("/professores", adminAuthMiddleware, controllers.getAllProfessorController.handle);
adminRoutes.get("/coordenadores", adminAuthMiddleware, controllers.getCoordenadoresController.handle);
adminRoutes.get("/cursos", adminAuthMiddleware, controllers.getCursosController.handle);
adminRoutes.get("/token/refresh", adminAuthMiddleware, controllers.refreshTokenController.handle);

export { adminRoutes };