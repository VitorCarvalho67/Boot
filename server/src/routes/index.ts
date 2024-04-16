import { Router } from "express";

import { alunoRoutes } from "./aluno.routes";
import { preAlunoRoutes } from "./preAluno.routes";

const routes = Router();

routes.use("/alunos", alunoRoutes)
routes.use("/prealunos", preAlunoRoutes)

export { routes };