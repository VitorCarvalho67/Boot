import { Router } from "express";
import { CreatePreAlunoController } from "../modules/alunos/useCase/createPreAluno/CreatePreAlunoController";

const createPreAlunoController = new CreatePreAlunoController();

const preAlunoRoutes = Router();

preAlunoRoutes.post("/create", createPreAlunoController.handle);

export { preAlunoRoutes };