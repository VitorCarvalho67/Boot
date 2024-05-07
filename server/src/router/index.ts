import { Router } from "express";

import { alunoRoutes } from "./routes/aluno.routes";
import { preAlunoRoutes } from "./routes/preAluno.routes";
import { adminRoutes } from "./routes/admin.routes"
import { professorRoutes } from "./routes/professor.routes";
import { funcionarioRoutes } from "./routes/funcionario.routes";

const routes = Router();

routes.use("/alunos", alunoRoutes);
routes.use("/prealunos", preAlunoRoutes);
routes.use("/admin", adminRoutes);
routes.use("/professor", professorRoutes);
routes.use("/funcionario", funcionarioRoutes);

export { routes };