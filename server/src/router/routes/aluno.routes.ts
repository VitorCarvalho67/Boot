import { Router } from "express";
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
} from "../../modules/controllers/alunoControllers";

const createAlunoController = new CreateAlunoController();
const validateAlunoController = new ValidateAlunoController();
const loginAlunoController = new LoginAlunoController();
const recoveryAlunoController = new RecoveryAlunoController();
const validateRecoveryController = new ValidateRecoveryController();
const completeAlunoController = new CompleteAlunoController();
const updateCurriculoController = new UpdateCurriculoController();
const createVinculoController = new CreateVinculoController();
const acceptVinculoController = new AcceptVinculoController();
const ignoreVinculoController = new IgnoreVinculoController();
const getVinculosController = new GetVinculosController();
const getVinculosProfileController = new GetVinculosProfileController();
const getUnlinkedsController = new GetUnlinkedsController();
const getCursosController = new GetCursosController();
const getCourseYearController = new GetCourseYearController();
const getCurriculoController = new GetCurriculoController();
const getMeController = new GetMeController();
const deleteVinculoController = new DeleteVinculoController();
const refreshTokenController = new RefreshTokenController();

const alunoRoutes = Router();

alunoRoutes.post("/register", createAlunoController.handle);
alunoRoutes.post("/validate", validateAlunoController.handle);
alunoRoutes.post("/register/complete", alunoAuthMiddleware, completeAlunoController.handle);
alunoRoutes.post("/curriculo/update", alunoAuthMiddleware, updateCurriculoController.handle);
alunoRoutes.post("/login", loginAlunoController.handle);
alunoRoutes.post("/recovery", recoveryAlunoController.handle);
alunoRoutes.post("/recovery/validate", validateRecoveryController.handle);
alunoRoutes.post("/link/send", alunoAuthMiddleware, createVinculoController.handle);
alunoRoutes.post("/link/accept", alunoAuthMiddleware, acceptVinculoController.handle);
alunoRoutes.post("/link/reject", alunoAuthMiddleware, ignoreVinculoController.handle);
alunoRoutes.post("/link/delete", alunoAuthMiddleware, deleteVinculoController.handle);

alunoRoutes.get("/auth", alunoAuthMiddleware, (req, res) => {
    res.status(200).send("Aluno autenticado com sucesso.");
});

alunoRoutes.get("/links", alunoAuthMiddleware, getVinculosController.handle);
alunoRoutes.get("/links/profile", alunoAuthMiddleware, getVinculosProfileController.handle);
alunoRoutes.get("/unlinkeds", alunoAuthMiddleware, getUnlinkedsController.handle);
alunoRoutes.get("/cursos", alunoAuthMiddleware, getCursosController.handle);
alunoRoutes.get("/cursos/anos", alunoAuthMiddleware, getCourseYearController.handle);
alunoRoutes.get("/curriculo", alunoAuthMiddleware, getCurriculoController.handle);
alunoRoutes.get("/me", alunoAuthMiddleware, getMeController.handle);
alunoRoutes.get("/token/refresh", alunoAuthMiddleware, refreshTokenController.handle);

export { alunoRoutes };