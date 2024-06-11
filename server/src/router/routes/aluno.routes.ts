import { Router } from "express";
import multer from "multer";
import { alunoAuthMiddleware } from '../../middleware/auth/autentication';
import {
    CreateVinculoController,
    AcceptVinculoController,
    GetVinculosController,
    GetVinculosProfileController,
    IgnoreVinculoController,
    GetUnlinkedsController,
    GetCursosController,
    DeleteVinculoController
} from "../../modules/controllers/sharedControllers";
import {
    CreateAlunoController,
    ValidateAlunoController,
    LoginAlunoController,
    RecoveryAlunoController,
    ValidateRecoveryController,
    CompleteAlunoController,
    UpdateCurriculoController,
    GetCourseYearController,
    GetCurriculoController,
    GetMeController,
    RefreshTokenController,
    UploadImgProfileController,
    UploadCapaController
} from "../../modules/controllers/alunoControllers";

const createControllers = () => ({
    createAlunoController: new CreateAlunoController(),
    validateAlunoController: new ValidateAlunoController(),
    loginAlunoController: new LoginAlunoController(),
    recoveryAlunoController: new RecoveryAlunoController(),
    validateRecoveryController: new ValidateRecoveryController(),
    completeAlunoController: new CompleteAlunoController(),
    updateCurriculoController: new UpdateCurriculoController(),
    createVinculoController: new CreateVinculoController(),
    acceptVinculoController: new AcceptVinculoController(),
    ignoreVinculoController: new IgnoreVinculoController(),
    getVinculosController: new GetVinculosController(),
    getVinculosProfileController: new GetVinculosProfileController(),
    getUnlinkedsController: new GetUnlinkedsController(),
    getCursosController: new GetCursosController(),
    getCourseYearController: new GetCourseYearController(),
    getCurriculoController: new GetCurriculoController(),
    getMeController: new GetMeController(),
    deleteVinculoController: new DeleteVinculoController(),
    refreshTokenController: new RefreshTokenController(),
    uploadImgProfileController: new UploadImgProfileController(),
    uploadCapaController: new UploadCapaController(),
});

const controllers = createControllers();
const alunoRoutes = Router();
const upload = multer({ dest: 'uploads/' });

alunoRoutes.post(
    '/upload/image/profile',
    upload.single('file'),
    alunoAuthMiddleware,
    controllers.uploadImgProfileController.handle
);
alunoRoutes.post(
    '/upload/image/banner',
    upload.single('file'),
    alunoAuthMiddleware,
    controllers.uploadCapaController.handle
);

alunoRoutes.post("/register", controllers.createAlunoController.handle);
alunoRoutes.post("/validate", controllers.validateAlunoController.handle);
alunoRoutes.post("/register/complete", alunoAuthMiddleware, controllers.completeAlunoController.handle);
alunoRoutes.post("/curriculo/update", alunoAuthMiddleware, controllers.updateCurriculoController.handle);
alunoRoutes.post("/login", controllers.loginAlunoController.handle);
alunoRoutes.post("/recovery", controllers.recoveryAlunoController.handle);
alunoRoutes.post("/recovery/validate", controllers.validateRecoveryController.handle);
alunoRoutes.post("/link/send", alunoAuthMiddleware, controllers.createVinculoController.handle);
alunoRoutes.post("/link/accept", alunoAuthMiddleware, controllers.acceptVinculoController.handle);
alunoRoutes.post("/link/reject", alunoAuthMiddleware, controllers.ignoreVinculoController.handle);
alunoRoutes.post("/link/delete", alunoAuthMiddleware, controllers.deleteVinculoController.handle);

alunoRoutes.get("/auth", alunoAuthMiddleware, (req, res) => {
    res.status(200).send("Aluno autenticado com sucesso.");
});

alunoRoutes.get("/links", alunoAuthMiddleware, controllers.getVinculosController.handle);
alunoRoutes.get("/links/profile", alunoAuthMiddleware, controllers.getVinculosProfileController.handle);
alunoRoutes.get("/unlinkeds", alunoAuthMiddleware, controllers.getUnlinkedsController.handle);
alunoRoutes.get("/cursos", alunoAuthMiddleware, controllers.getCursosController.handle);
alunoRoutes.get("/cursos/anos", alunoAuthMiddleware, controllers.getCourseYearController.handle);
alunoRoutes.get("/curriculo", alunoAuthMiddleware, controllers.getCurriculoController.handle);
alunoRoutes.get("/me", alunoAuthMiddleware, controllers.getMeController.handle);
alunoRoutes.get("/token/refresh", alunoAuthMiddleware, controllers.refreshTokenController.handle);

export { alunoRoutes };