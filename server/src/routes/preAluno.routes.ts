import { Router } from "express";
import { CreatePreAlunoController } from "../modules/alunos/useCase/createPreAluno/CreatePreAlunoController";

const createPreAlunoUseController = new CreatePreAlunoController();

const preAlunoRoutes = Router();

preAlunoRoutes.post("/create", createPreAlunoUseController.handle);

export { preAlunoRoutes };