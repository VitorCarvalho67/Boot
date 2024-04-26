import { Router } from "express";
import { LoginAdminController } from "../modules/admins/useCase/loginAdmin/LoginAdminController";
import { RegisterCursosController } from "../modules/admins/useCase/registerCursos/RegisterCursosController";
import { adminAuthMiddleware } from '../middleware/adminAutentication';
import { RegisterProfessorController } from "../modules/admins/useCase/registerProfessor/RegisterProfessorController";
import { RegisterCoordenadorController } from "../modules/admins/useCase/registerCoordenador/RegisterCoordenadorController";

const loginAdminController = new LoginAdminController();
const registerCursosController = new RegisterCursosController();
const registerProfessorController = new RegisterProfessorController();
const  registerCoordenadorController = new RegisterCoordenadorController();

const adminRoutes = Router();

adminRoutes.post("/login", loginAdminController.handle);
adminRoutes.post("/register/course", adminAuthMiddleware, registerCursosController.handle);
adminRoutes.post("/register/professor", adminAuthMiddleware, registerProfessorController.handle);
adminRoutes.post("/register/coordenador", adminAuthMiddleware, registerCoordenadorController.handle);
adminRoutes.post("/auth", adminAuthMiddleware);

export { adminRoutes };