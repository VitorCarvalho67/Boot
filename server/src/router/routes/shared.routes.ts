import { Router } from "express";
import { alunoAuthMiddleware } from '../../middleware/auth/autentication';
import {
    GetCurriculoController,
    GetProfileImageController,
    GetBannerController
} from "../../modules/controllers/sharedControllers";

const createControllers = () => ({
    getCurriculoController: new GetCurriculoController(),
    getProfileImageController: new GetProfileImageController(),
    getBannerController: new GetBannerController()
});

const controllers = createControllers();
const sharedRoutes = Router();

sharedRoutes.get("/curriculo", controllers.getCurriculoController.handle);
sharedRoutes.get("/profile/image", controllers.getProfileImageController.handle);
sharedRoutes.get("/profile/banner", controllers.getBannerController.handle);

export { sharedRoutes };