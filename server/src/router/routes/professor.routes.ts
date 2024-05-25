import { Router } from "express";
import { professorAuthMiddleware } from '../../middleware/auth/autentication';
import {
    CreateVinculoController,
    AcceptVinculoController,
    GetVinculosController,
    IgnoreVinculoController,
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
const ignoreVinculoController = new IgnoreVinculoController();
const getVinculosController = new GetVinculosController();

const professorRoutes = Router();

professorRoutes.post("/validate", validateProfessorController.handle);
professorRoutes.post("/login", loginProfessorController.handle);
professorRoutes.post("/recovery", recoveryProfessorController.handle);
professorRoutes.post("/recovery/validate", validateRecoveryController.handle);
professorRoutes.post("/link/send", professorAuthMiddleware, createVinculoController.handle);
professorRoutes.post("/link/accept", professorAuthMiddleware, acceptVinculoController.handle);
professorRoutes.post("/link/reject", professorAuthMiddleware, ignoreVinculoController.handle);

professorRoutes.get("/links", professorAuthMiddleware, getVinculosController.handle);
professorRoutes.post("/auth", professorAuthMiddleware, (req, res) => {
    res.status(200).send("Professor autenticado com sucesso.");
});

professorRoutes.get("/init", initProfessorController.handle);

export { professorRoutes };