import { Router } from "express";
import { professorAuthMiddleware } from '../../middleware/autentication';
import {
    ValidateProfessorController,
    LoginProfessorController,
    InitProfessorController
} from "../../modules/controllers/professorControllers";

const validateProfessorController = new ValidateProfessorController();
const loginProfessorController = new LoginProfessorController();
const initProfessorController = new InitProfessorController();

const professorRoutes = Router();

professorRoutes.get("/init", initProfessorController.handle);
professorRoutes.post("/validate", validateProfessorController.handle);
professorRoutes.post("/login", loginProfessorController.handle);

professorRoutes.post("/auth", professorAuthMiddleware, (req, res) => {
    res.status(200).send("Professor autenticado com sucesso.");
});

export { professorRoutes };