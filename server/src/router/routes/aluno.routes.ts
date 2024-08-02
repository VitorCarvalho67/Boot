import { Router } from "express";
import multer from "multer";
import { alunoAuthMiddleware } from '../../middleware/auth/autentication';
import { createControllers } from "./imports/aluno";

const controllers = createControllers();
const alunoRoutes = Router();
const upload = multer({ dest: 'uploads/' });

alunoRoutes.post("/register", controllers.createAlunoController.handle);
alunoRoutes.post("/validate", controllers.validateAlunoController.handle);
alunoRoutes.post("/login", controllers.loginAlunoController.handle);
alunoRoutes.post("/recovery", controllers.recoveryAlunoController.handle);

alunoRoutes.post('/upload/image/banner', upload.single('file'), alunoAuthMiddleware, controllers.uploadCapaController.handle);
alunoRoutes.post('/upload/image/profile', upload.single('file'), alunoAuthMiddleware, controllers.uploadImgProfileController.handle);
alunoRoutes.post('/upload/boletim', upload.single('file'), alunoAuthMiddleware, controllers.sendBoletimController.handle);

alunoRoutes.use(alunoAuthMiddleware);

alunoRoutes.post("/register/complete", controllers.completeAlunoController.handle);
alunoRoutes.post("/curriculo/update", controllers.updateCurriculoController.handle);
alunoRoutes.post("/recovery/validate", controllers.validateRecoveryController.handle);
alunoRoutes.post("/link/send", controllers.createVinculoController.handle);
alunoRoutes.post("/link/accept", controllers.acceptVinculoController.handle);
alunoRoutes.post("/link/reject", controllers.ignoreVinculoController.handle);
alunoRoutes.post("/link/delete", controllers.deleteVinculoController.handle);
alunoRoutes.post("/password/change", controllers.changePassController.handle);
alunoRoutes.post("/message/send", controllers.createMessageController.handle);
alunoRoutes.post("/extracurricular/send", controllers.registerExtracurricularController.handle);
alunoRoutes.post("/extracurricular/edit", controllers.editExtracurricularController.handle);
alunoRoutes.post("/extracurricular/exclude", controllers.excludeExtracurricularController.handle);

alunoRoutes.get("/auth", (req, res) => {
    res.status(200).send("Aluno autenticado com sucesso.");
});

alunoRoutes.get("/links", controllers.getVinculosController.handle);
alunoRoutes.get("/links/profile", controllers.getVinculosProfileController.handle);
alunoRoutes.get("/unlinkeds", controllers.getUnlinkedsController.handle);
alunoRoutes.get("/cursos", controllers.getCursosController.handle);
alunoRoutes.get("/cursos/anos", controllers.getCourseYearController.handle);
alunoRoutes.get("/curriculo", controllers.getCurriculoController.handle);
alunoRoutes.get("/me", controllers.getMeController.handle);
alunoRoutes.get("/token/refresh", controllers.refreshTokenController.handle);
alunoRoutes.get("/messages", controllers.getLastMessagesController.handle);
alunoRoutes.get("/messages/between", controllers.getMessagesBetweenController.handle);

export { alunoRoutes };