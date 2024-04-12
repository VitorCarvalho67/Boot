import { Router } from "express";

import { alunoRoutes } from "./aluno.routes";

const routes = Router();

routes.use("/alunos", alunoRoutes)

export { routes };