import { Router } from "express";
import { ValidateProfessorController } from "../modules/teacher/useCase/validateProfessor/ValidateProfessorController";
import { LoginProfessorController } from "../modules/teacher/useCase/loginProfessor/LoginProfessorController";
import { InitProfessorController } from "../modules/teacher/useCase/initProfessor/InitProfessorController";
import { professorAuthMiddleware } from '../middleware/autentication';

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