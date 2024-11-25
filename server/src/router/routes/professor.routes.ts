import { Router } from "express";
import { professorAuthMiddleware } from '../../middleware/auth/autentication';
import { createControllers } from "./imports/professor";
import multer from "multer";

const controllers = createControllers();
const professorRoutes = Router();
const upload = multer({ dest: 'uploads/' });

professorRoutes.post("/validate", controllers.validateProfessorController.handle);
professorRoutes.post("/login", controllers.loginProfessorController.handle);
professorRoutes.post("/recovery", controllers.recoveryProfessorController.handle);
professorRoutes.post("/recovery/validate", controllers.validateRecoveryController.handle);

professorRoutes.get("/init", controllers.initProfessorController.handle);

professorRoutes.post('/upload/image/banner', upload.single('file'), professorAuthMiddleware, controllers.uploadCapaController.handle);
professorRoutes.post('/upload/image/profile', upload.single('file'), professorAuthMiddleware, controllers.uploadImgProfileController.handle);

professorRoutes.use(professorAuthMiddleware);

professorRoutes.post("/link/send", controllers.createVinculoController.handle);
professorRoutes.post("/link/accept", controllers.acceptVinculoController.handle);
professorRoutes.post("/link/reject", controllers.ignoreVinculoController.handle);
professorRoutes.post("/link/delete", controllers.deleteVinculoController.handle);
professorRoutes.post("/message/send", controllers.createMessageController.handle);
professorRoutes.post("/activity/create", controllers.createActivityController.handle);
professorRoutes.post("/activity/relate", controllers.recoveryProfessorController.handle);
professorRoutes.post("/curriculo/update", controllers.updateCurriculoController.handle);

professorRoutes.get("/auth", (req, res) => {
    res.status(200).send("Professor autenticado com sucesso.");
});

professorRoutes.get("/links", controllers.getVinculosController.handle);
professorRoutes.get("/unlinkeds", controllers.getUnlinkedsController.handle);
professorRoutes.get("/token/refresh", controllers.refreshTokenController.handle);
professorRoutes.get("/messages", controllers.getLastMessagesController.handle);
professorRoutes.get("/messages/between", controllers.getMessagesBetweenController.handle);
professorRoutes.get("/curriculo", controllers.getCurriculoController.handle);

export { professorRoutes };