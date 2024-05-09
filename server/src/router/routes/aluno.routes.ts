import { Router } from "express";
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

export { alunoRoutes };