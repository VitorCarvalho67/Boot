import { Router } from "express";
import { professorAuthMiddleware } from '../../middleware/auth/autentication';
import { createControllers } from "./imports/professor";

const controllers = createControllers();
const professorRoutes = Router();

professorRoutes.post("/validate", controllers.validateProfessorController.handle);
professorRoutes.post("/login", controllers.loginProfessorController.handle);
professorRoutes.post("/recovery", controllers.recoveryProfessorController.handle);
professorRoutes.post("/recovery/validate", controllers.validateRecoveryController.handle);

professorRoutes.get("/init", controllers.initProfessorController.handle);

professorRoutes.use(professorAuthMiddleware);

professorRoutes.post("/link/send", controllers.createVinculoController.handle);
professorRoutes.post("/link/accept", controllers.acceptVinculoController.handle);
professorRoutes.post("/link/reject", controllers.ignoreVinculoController.handle);
professorRoutes.post("/link/delete", controllers.deleteVinculoController.handle);
professorRoutes.post("/message/send", controllers.createMessageController.handle);

professorRoutes.get("/auth", (req, res) => {
    res.status(200).send("Professor autenticado com sucesso.");
});

professorRoutes.get("/links", controllers.getVinculosController.handle);
professorRoutes.get("/unlinkeds", controllers.getUnlinkedsController.handle);
professorRoutes.get("/token/refresh", controllers.refreshTokenController.handle);

export { professorRoutes };