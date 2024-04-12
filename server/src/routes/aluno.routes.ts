import { Router } from "express";
import { CreateAlunoUseController } from "../modules/alunos/useCase/createAluno/CreateAlunoController";

const createAlunoUseController = new CreateAlunoUseController();

const alunoRoutes = Router();

alunoRoutes.post("/create", createAlunoUseController.handle);

export { alunoRoutes };