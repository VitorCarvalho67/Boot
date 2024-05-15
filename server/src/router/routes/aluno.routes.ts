import { Router } from "express";
import { alunoAuthMiddleware } from '../../middleware/autentication';
import {
    CreateAlunoController,
    CreatePreAlunoController,
    LoginAlunoController,
    RecoveryAlunoController,
    ValidateRecoveryController
} from "../../modules/controllers/alunoControllers";

const createPreAlunoController = new CreatePreAlunoController();
const createAlunoUseController = new CreateAlunoController();
const loginAlunoController = new LoginAlunoController();
const recoveryAlunoController = new RecoveryAlunoController();
const validateRecoveryController = new ValidateRecoveryController();

const alunoRoutes = Router();

alunoRoutes.post("/create/prealuno", createPreAlunoController.handle);
alunoRoutes.post("/create", createAlunoUseController.handle);
alunoRoutes.post("/login", loginAlunoController.handle);
alunoRoutes.post("/recovery", recoveryAlunoController.handle);
alunoRoutes.post("/recovery/validate", validateRecoveryController.handle);

alunoRoutes.get("/auth", alunoAuthMiddleware, (req, res) => {
    res.status(200).send("Aluno autenticado com sucesso.");
});

export { alunoRoutes };