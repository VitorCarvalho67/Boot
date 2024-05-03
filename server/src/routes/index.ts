import { Router } from "express";

import { alunoRoutes } from "./aluno.routes";
import { preAlunoRoutes } from "./preAluno.routes";
import { adminRoutes } from "./admin.routes"
import { professorRoutes } from "./professor.routes";
import { funcionarioRoutes } from "./funcionario.routes";

const routes = Router();

routes.use("/alunos", alunoRoutes);
routes.use("/prealunos", preAlunoRoutes);
routes.use("/admin", adminRoutes);
routes.use("/professor", professorRoutes);
routes.use("/funcionario", funcionarioRoutes);

export { routes };