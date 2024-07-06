import { Router } from "express";
import { createControllers } from "./imports/shared";

const controllers = createControllers();
const sharedRoutes = Router();

sharedRoutes.get("/curriculo", controllers.getCurriculoController.handle);
sharedRoutes.get("/profile/image", controllers.getProfileImageController.handle);
sharedRoutes.get("/profile/banner", controllers.getBannerController.handle);
sharedRoutes.get("/users", controllers.searchUserController.handle);

export { sharedRoutes };