import { Router } from "express";
import { CreateAlunoController } from "../modules/alunos/useCase/createAluno/CreateAlunoController";
import { LoginAlunoController } from "../modules/alunos/useCase/loginAluno/LoginAlunoController";
import { RecoveryAlunoController } from "../modules/alunos/useCase/recoveryAluno/RecoveryAlunoController";
import { ValidateRecoveryController } from "../modules/alunos/useCase/validateRecovery/validateRecoveryController";

const createAlunoUseController = new CreateAlunoController();
const loginAlunoController = new LoginAlunoController();
const recoveryAlunoController = new RecoveryAlunoController();
const validateRecoveryController = new ValidateRecoveryController();

const alunoRoutes = Router();

alunoRoutes.post("/create", createAlunoUseController.handle);
alunoRoutes.post("/login", loginAlunoController.handle);
alunoRoutes.post("/recovery", recoveryAlunoController.handle);
alunoRoutes.post("/recovery/validate", validateRecoveryController.handle);

export { alunoRoutes };