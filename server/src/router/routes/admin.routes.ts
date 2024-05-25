import { Router } from "express";
import { adminAuthMiddleware } from '../../middleware/auth/autentication';
import {
    LoginAdminController,
    RegisterCursosController,
    RegisterProfessorController,
    RegisterFuncionarioController,
    RegisterCoordenadorController,
    GetAllProfessorController,
    GetCoordenadorController,
    GetCursosController,
    RegisterTurmaController
} from "../../modules/controllers/adminControllers";

const loginAdminController = new LoginAdminController();
const registerCursosController = new RegisterCursosController();
const registerProfessorController = new RegisterProfessorController();
const registerFuncionarioController = new RegisterFuncionarioController();
const registerCoordenadorController = new RegisterCoordenadorController();
const registerTurmaController = new RegisterTurmaController();
const getAllProfessorController = new GetAllProfessorController();
const getCoordenadoresController = new GetCoordenadorController();
const getCursosController = new GetCursosController();

const adminRoutes = Router();

adminRoutes.post("/login", loginAdminController.handle);
adminRoutes.post("/register/course", adminAuthMiddleware, registerCursosController.handle);
adminRoutes.post("/register/professor", adminAuthMiddleware, registerProfessorController.handle);
adminRoutes.post("/register/funcionario", adminAuthMiddleware, registerFuncionarioController.handle);
adminRoutes.post("/register/coordenador", adminAuthMiddleware, registerCoordenadorController.handle);
adminRoutes.post("/register/turma", adminAuthMiddleware, registerTurmaController.handle);

adminRoutes.get("/auth", adminAuthMiddleware, (req, res) => {
    res.status(200).send("Admin autenticado com sucesso.");
});

adminRoutes.get("/professores", adminAuthMiddleware, getAllProfessorController.handle);
adminRoutes.get("/coordenadores", adminAuthMiddleware, getCoordenadoresController.handle);
adminRoutes.get("/cursos", adminAuthMiddleware, getCursosController.handle)

export { adminRoutes };