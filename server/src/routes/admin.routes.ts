import { Router } from "express";
import { LoginAdminController } from "../modules/admins/useCase/loginAdmin/LoginAdminController";
import { RegisterCursosController } from "../modules/admins/useCase/registerCursos/RegisterCursosController";
import { adminAuthMiddleware } from '../middleware/adminAutentication';
import { RegisterProfessorController } from "../modules/admins/useCase/registerProfessor/RegisterProfessorController";
import { RegisterFuncionarioController } from "../modules/admins/useCase/registerFuncionario/RegisterFuncionarioController";
import { RegisterCoordenadorController } from "../modules/admins/useCase/registerCoordenador/RegisterCoordenadorController";
import { GetAllProfessorController } from "../modules/admins/useCase/getAllProfessores/GetAllProfessorController";
import { GetCoordenadorController } from "../modules/admins/useCase/getCoordenadores/GetCoordenadoresController";

const loginAdminController = new LoginAdminController();
const registerCursosController = new RegisterCursosController();
const registerProfessorController = new RegisterProfessorController();
const registerFuncionarioController = new RegisterFuncionarioController();
const registerCoordenadorController = new RegisterCoordenadorController();
const getAllProfessorController = new GetAllProfessorController();
const getCoordenadoresController = new GetCoordenadorController();

const adminRoutes = Router();

adminRoutes.post("/login", loginAdminController.handle);
adminRoutes.post("/register/course", adminAuthMiddleware, registerCursosController.handle);
adminRoutes.post("/register/professor", adminAuthMiddleware, registerProfessorController.handle);
adminRoutes.post("/register/funcionario", adminAuthMiddleware, registerFuncionarioController.handle);
adminRoutes.post("/register/coordenador", adminAuthMiddleware, registerCoordenadorController.handle);

adminRoutes.post("/auth", adminAuthMiddleware, (req, res) => {
    res.status(200).send("Usuário autenticado com sucesso.");
});

adminRoutes.post("/professores", adminAuthMiddleware, getAllProfessorController.handle);
adminRoutes.post("/coordenadores", adminAuthMiddleware, getCoordenadoresController.handle);

export { adminRoutes };