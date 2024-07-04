import {
    GetCurriculoController,
    GetProfileImageController,
    GetBannerController
} from "../../../modules/controllers/sharedControllers";

export const createControllers = () => ({
    getCurriculoController: new GetCurriculoController(),
    getProfileImageController: new GetProfileImageController(),
    getBannerController: new GetBannerController()
});