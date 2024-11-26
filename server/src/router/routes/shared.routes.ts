import { Router } from "express";
import { createControllers } from "./imports/shared";

const controllers = createControllers();
const sharedRoutes = Router();

sharedRoutes.get("/curriculo", controllers.getCurriculoController.handle);
sharedRoutes.get("/profile/image", controllers.getProfileImageController.handle);
sharedRoutes.get("/profile/banner", controllers.getBannerController.handle);
sharedRoutes.get("/users", controllers.searchUserController.handle);
sharedRoutes.get("/vagas", controllers.getVagasController.handle);
sharedRoutes.get("/vaga", controllers.getVagaController.handle);
sharedRoutes.get("/extracurriculares", controllers.getExtracurricularsByRMController.handle);
sharedRoutes.get("/ranking/boletim", controllers.getRankingController.handle);
sharedRoutes.get("/empresa", controllers.getEmpresaController.handle);
sharedRoutes.get("/professor", controllers.getProfessorController.handle);

export { sharedRoutes };