import { Router } from "express";
import { LoginAdminController } from "../modules/admins/useCase/loginAdmin/LoginAdminController";
import { RegisterCursosController } from "../modules/admins/useCase/registerCursos/RegisterCursosController";
import { adminAuthMiddleware } from '../middleware/adminAutentication';

const loginAdminController = new LoginAdminController();
const registerCursosController = new RegisterCursosController();

const adminRoutes = Router();

adminRoutes.post("/login", loginAdminController.handle);
adminRoutes.post("/register/couse", adminAuthMiddleware, registerCursosController.handle);

export { adminRoutes };