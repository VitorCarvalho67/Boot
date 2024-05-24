import { Router } from "express";
import { professorAuthMiddleware } from '../../middleware/autentication';
import{ CreateVinculoController } from "../../modules/controllers/sharedControllers";
import {
    ValidateProfessorController,
    LoginProfessorController,
    InitProfessorController,
    RecoveryProfessorController,
    ValidateRecoveryController
} from "../../modules/controllers/professorControllers";

const validateProfessorController = new ValidateProfessorController();
const loginProfessorController = new LoginProfessorController();
const initProfessorController = new InitProfessorController();
const recoveryProfessorController = new RecoveryProfessorController();
const validateRecoveryController = new ValidateRecoveryController();
const createVinculoUseCase = new CreateVinculoController();

const professorRoutes = Router();

professorRoutes.post("/validate", validateProfessorController.handle);
professorRoutes.post("/login", loginProfessorController.handle);
professorRoutes.post("/recovery", recoveryProfessorController.handle);
professorRoutes.post("/recovery/validate", validateRecoveryController.handle);
professorRoutes.post("/link", professorAuthMiddleware, createVinculoUseCase.handle);

professorRoutes.post("/auth", professorAuthMiddleware, (req, res) => {
    res.status(200).send("Professor autenticado com sucesso.");
});

professorRoutes.get("/init", initProfessorController.handle);

export { professorRoutes };