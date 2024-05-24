import { Router } from "express";
import { professorAuthMiddleware } from '../../middleware/autentication';
import {
    CreateVinculoController,
    AcceptVinculoController,
    GetVinculosController
} from "../../modules/controllers/sharedControllers";
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
const createVinculoController = new CreateVinculoController();
const acceptVinculoController = new AcceptVinculoController();
const getVinculosController = new GetVinculosController();

const professorRoutes = Router();

professorRoutes.post("/validate", validateProfessorController.handle);
professorRoutes.post("/login", loginProfessorController.handle);
professorRoutes.post("/recovery", recoveryProfessorController.handle);
professorRoutes.post("/recovery/validate", validateRecoveryController.handle);
professorRoutes.post("/link", professorAuthMiddleware, createVinculoController.handle);
professorRoutes.post("/link/accept", professorAuthMiddleware, acceptVinculoController.handle);

professorRoutes.get("/links", professorAuthMiddleware, getVinculosController.handle);
professorRoutes.post("/auth", professorAuthMiddleware, (req, res) => {
    res.status(200).send("Professor autenticado com sucesso.");
});

professorRoutes.get("/init", initProfessorController.handle);

export { professorRoutes };