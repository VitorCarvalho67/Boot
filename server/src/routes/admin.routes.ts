import { Router } from "express";
import { LoginAdminController } from "../modules/admins/useCase/loginAdmin/LoginAdminController";

const loginAdminController = new LoginAdminController();

const adminRoutes = Router();

adminRoutes.post("/login", loginAdminController.handle);

export { adminRoutes };