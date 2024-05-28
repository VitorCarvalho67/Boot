import { Router } from "express";
import { alunoAuthMiddleware } from '../../middleware/auth/autentication';
import {
    CreateVinculoController,
    AcceptVinculoController,
    GetVinculosController,
    IgnoreVinculoController,
    GetUnlinkedsController,
    GetCursosController
} from "../../modules/controllers/sharedControllers";
import {
    CreateAlunoController,
    CreatePreAlunoController,
    LoginAlunoController,
    RecoveryAlunoController,
    ValidateRecoveryController,
    CompleteAlunoController,
    UpdateCurriculoController,
    GetCourseYearController
} from "../../modules/controllers/alunoControllers";

const createPreAlunoController = new CreatePreAlunoController();
const createAlunoUseController = new CreateAlunoController();
const loginAlunoController = new LoginAlunoController();
const recoveryAlunoController = new RecoveryAlunoController();
const validateRecoveryController = new ValidateRecoveryController();
const completeAlunoController = new CompleteAlunoController();
const updateCurriculoController = new UpdateCurriculoController();
const createVinculoController = new CreateVinculoController();
const acceptVinculoController = new AcceptVinculoController();
const ignoreVinculoController = new IgnoreVinculoController();
const getVinculosController = new GetVinculosController();
const getUnlinkedsController = new GetUnlinkedsController();
const getCursosController = new GetCursosController();
const getCourseYearController = new GetCourseYearController();

const alunoRoutes = Router();

alunoRoutes.post("/register/prealuno", createPreAlunoController.handle);
alunoRoutes.post("/register", createAlunoUseController.handle);
alunoRoutes.post("/register/complete", alunoAuthMiddleware, completeAlunoController.handle);
alunoRoutes.post("/curriculo/update", alunoAuthMiddleware, updateCurriculoController.handle);
alunoRoutes.post("/login", loginAlunoController.handle);
alunoRoutes.post("/recovery", recoveryAlunoController.handle);
alunoRoutes.post("/recovery/validate", validateRecoveryController.handle);
alunoRoutes.post("/link/send", alunoAuthMiddleware, createVinculoController.handle);
alunoRoutes.post("/link/accept", alunoAuthMiddleware, acceptVinculoController.handle);
alunoRoutes.post("/link/reject", alunoAuthMiddleware, ignoreVinculoController.handle);

alunoRoutes.get("/auth", alunoAuthMiddleware, (req, res) => {
    res.status(200).send("Aluno autenticado com sucesso.");
});

alunoRoutes.get("/links", alunoAuthMiddleware, getVinculosController.handle);
alunoRoutes.get("/unlinkeds", alunoAuthMiddleware, getUnlinkedsController.handle);
alunoRoutes.get("/cursos", alunoAuthMiddleware, getCursosController.handle);
alunoRoutes.get("/cursos/anos", alunoAuthMiddleware, getCourseYearController.handle);

export { alunoRoutes };