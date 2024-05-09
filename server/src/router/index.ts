import { Router } from "express";

import { adminRoutes } from "./routes/admin.routes"
import { alunoRoutes } from "./routes/aluno.routes";
import { empresaRoutes } from "./routes/empresa.routes"
import { funcionarioRoutes } from "./routes/funcionario.routes";
import { professorRoutes } from "./routes/professor.routes";

const routes = Router();

routes.use("/admin", adminRoutes);
routes.use("/aluno", alunoRoutes);
routes.use("/empresa", empresaRoutes);
routes.use("/funcionario", funcionarioRoutes);
routes.use("/professor", professorRoutes);

export { routes };