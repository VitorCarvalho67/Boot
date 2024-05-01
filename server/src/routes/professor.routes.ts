import { Router } from "express";
import { ValidateProfessorController } from "../modules/teacher/useCase/validateProfessor/ValidateProfessorController";
import { LoginProfessorController } from "../modules/teacher/useCase/loginProfessor/LoginProfessorController";
import { professorAuthMiddleware } from '../middleware/autentication';

const validateProfessorController = new ValidateProfessorController();
const loginProfessorController = new LoginProfessorController();

const professorRoutes = Router();

professorRoutes.post("/validate", validateProfessorController.handle);
professorRoutes.post("/login", loginProfessorController.handle);

professorRoutes.post("/auth", professorAuthMiddleware, (req, res) => {
    res.status(200).send("Professor autenticado com sucesso.");
});


export { professorRoutes };