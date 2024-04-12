import { Router } from "express";
import { CreateAlunoController } from "../modules/alunos/useCase/createAluno/CreateAlunoController";
import { LoginAlunoController } from "../modules/alunos/useCase/loginAluno/LoginAlunoController";

const createAlunoUseController = new CreateAlunoController();
const loginAlunoController = new LoginAlunoController();

const alunoRoutes = Router();

alunoRoutes.post("/create", createAlunoUseController.handle);
alunoRoutes.post("/login", loginAlunoController.handle);

export { alunoRoutes };