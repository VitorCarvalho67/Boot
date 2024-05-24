import { Router } from "express";
import { alunoAuthMiddleware } from '../../middleware/autentication';
import{ CreateVinculoController } from "../../modules/controllers/sharedControllers";
import {
    CreateAlunoController,
    CreatePreAlunoController,
    LoginAlunoController,
    RecoveryAlunoController,
    ValidateRecoveryController,
    CompleteAlunoController,
    UpdateCurriculoController
} from "../../modules/controllers/alunoControllers";

const createPreAlunoController = new CreatePreAlunoController();
const createAlunoUseController = new CreateAlunoController();
const loginAlunoController = new LoginAlunoController();
const recoveryAlunoController = new RecoveryAlunoController();
const validateRecoveryController = new ValidateRecoveryController();
const completeAlunoController = new CompleteAlunoController();
const updateCurriculoController = new UpdateCurriculoController();
const createVinculoUseCase = new CreateVinculoController();

const alunoRoutes = Router();

alunoRoutes.post("/register/prealuno", createPreAlunoController.handle);
alunoRoutes.post("/register", createAlunoUseController.handle);
alunoRoutes.post("/register/complete", alunoAuthMiddleware, completeAlunoController.handle);
alunoRoutes.post("/update/curriculo", alunoAuthMiddleware, updateCurriculoController.handle);
alunoRoutes.post("/login", loginAlunoController.handle);
alunoRoutes.post("/recovery", recoveryAlunoController.handle);
alunoRoutes.post("/recovery/validate", validateRecoveryController.handle);
alunoRoutes.post("/link", alunoAuthMiddleware, createVinculoUseCase.handle);

alunoRoutes.get("/auth", alunoAuthMiddleware, (req, res) => {
    res.status(200).send("Aluno autenticado com sucesso.");
});

export { alunoRoutes };