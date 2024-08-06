import { Router } from "express";
import { adminAuthMiddleware } from '../../middleware/auth/autentication';
import { createControllers } from "./imports/admin";

const controllers = createControllers();
const adminRoutes = Router();

adminRoutes.post("/login", controllers.loginAdminController.handle);

adminRoutes.use(adminAuthMiddleware);

adminRoutes.post("/register/course", controllers.registerCursosController.handle);
adminRoutes.post("/register/professor", controllers.registerProfessorController.handle);
adminRoutes.post("/register/funcionario", controllers.registerFuncionarioController.handle);
adminRoutes.post("/register/coordenador", controllers.registerCoordenadorController.handle);
adminRoutes.post("/register/turma", controllers.registerTurmaController.handle);

adminRoutes.get("/auth", (req, res) => {
    res.status(200).send("Admin autenticado com sucesso.");
});

adminRoutes.get("/professores", controllers.getAllProfessoresController.handle);
adminRoutes.get("/coordenadores", controllers.getAllCoordenadoresController.handle);
adminRoutes.get("/cursos", controllers.getCursosController.handle);
adminRoutes.get("/token/refresh", controllers.refreshTokenController.handle);
adminRoutes.get("table/professores", controllers.getFullProfessoresController.handle);
adminRoutes.get("table/coordenadores", controllers.getFullCoordenadoresController.handle);
adminRoutes.get("table/cursos", controllers.getFullCursosController.handle);
adminRoutes.get("table/estagios", controllers.getFullEstagiosController.handle);
adminRoutes.get("table/funcionarios", controllers.getFullFuncionariosController.handle);
adminRoutes.get("table/turmas", controllers.getFullTurmasController.handle);

export { adminRoutes };