import {
    GetCurriculoController,
    GetProfileImageController,
    GetBannerController,
    SearchUserController
} from "../../../modules/controllers/sharedControllers";

export const createControllers = () => ({
    getCurriculoController: new GetCurriculoController(),
    getProfileImageController: new GetProfileImageController(),
    getBannerController: new GetBannerController(),
    searchUserController: new SearchUserController()
});