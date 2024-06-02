import { Router } from "express";
import { professorAuthMiddleware } from '../../middleware/auth/autentication';
import {
    CreateVinculoController,
    AcceptVinculoController,
    GetVinculosController,
    IgnoreVinculoController,
    GetUnlinkedsController,
    DeleteVinculoController
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
const deleteVinculoController = new DeleteVinculoController();
const getVinculosController = new GetVinculosController();
const getUnlinkedsController = new GetUnlinkedsController();

const professorRoutes = Router();

professorRoutes.post("/validate", validateProfessorController.handle);
professorRoutes.post("/login", loginProfessorController.handle);
professorRoutes.post("/recovery", recoveryProfessorController.handle);
professorRoutes.post("/recovery/validate", validateRecoveryController.handle);
professorRoutes.post("/link/send", professorAuthMiddleware, createVinculoController.handle);
professorRoutes.post("/link/accept", professorAuthMiddleware, acceptVinculoController.handle);
professorRoutes.post("/link/reject", professorAuthMiddleware, ignoreVinculoController.handle);
professorRoutes.post("/link/delete", professorAuthMiddleware, deleteVinculoController.handle);

professorRoutes.get("/auth", professorAuthMiddleware, (req, res) => {
    res.status(200).send("Professor autenticado com sucesso.");
});

professorRoutes.get("/init", initProfessorController.handle);
professorRoutes.get("/links", professorAuthMiddleware, getVinculosController.handle);
professorRoutes.get("/unlinkeds", professorAuthMiddleware, getUnlinkedsController.handle);

export { professorRoutes };