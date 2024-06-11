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
    ValidateRecoveryController,
    RefreshTokenController
} from "../../modules/controllers/professorControllers";

const createControllers = () => ({
    validateProfessorController: new ValidateProfessorController(),
    loginProfessorController: new LoginProfessorController(),
    initProfessorController: new InitProfessorController(),
    recoveryProfessorController: new RecoveryProfessorController(),
    validateRecoveryController: new ValidateRecoveryController(),
    createVinculoController: new CreateVinculoController(),
    acceptVinculoController: new AcceptVinculoController(),
    ignoreVinculoController: new IgnoreVinculoController(),
    deleteVinculoController: new DeleteVinculoController(),
    getVinculosController: new GetVinculosController(),
    getUnlinkedsController: new GetUnlinkedsController(),
    refreshTokenController: new RefreshTokenController()
});

const controllers = createControllers();
const professorRoutes = Router();

professorRoutes.post("/validate", controllers.validateProfessorController.handle);
professorRoutes.post("/login", controllers.loginProfessorController.handle);
professorRoutes.post("/recovery", controllers.recoveryProfessorController.handle);
professorRoutes.post("/recovery/validate", controllers.validateRecoveryController.handle);
professorRoutes.post("/link/send", professorAuthMiddleware, controllers.createVinculoController.handle);
professorRoutes.post("/link/accept", professorAuthMiddleware, controllers.acceptVinculoController.handle);
professorRoutes.post("/link/reject", professorAuthMiddleware, controllers.ignoreVinculoController.handle);
professorRoutes.post("/link/delete", professorAuthMiddleware, controllers.deleteVinculoController.handle);

professorRoutes.get("/auth", professorAuthMiddleware, (req, res) => {
    res.status(200).send("Professor autenticado com sucesso.");
});

professorRoutes.get("/init", controllers.initProfessorController.handle);
professorRoutes.get("/links", professorAuthMiddleware, controllers.getVinculosController.handle);
professorRoutes.get("/unlinkeds", professorAuthMiddleware, controllers.getUnlinkedsController.handle);
professorRoutes.get("/token/refresh", professorAuthMiddleware, controllers.refreshTokenController.handle);

export { professorRoutes };