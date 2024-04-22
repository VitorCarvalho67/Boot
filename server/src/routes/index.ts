import { Router } from "express";

import { alunoRoutes } from "./aluno.routes";
import { preAlunoRoutes } from "./preAluno.routes";
import { adminRoutes } from "./admin.routes";

const routes = Router();

routes.use("/alunos", alunoRoutes)
routes.use("/prealunos", preAlunoRoutes)
routes.use("/admin", adminRoutes)

export { routes };