import {
    GetCurriculoController,
    GetProfileImageController,
    GetBannerController,
    SearchUserController,
    GetVagasController,
    GetVagaController,
    GetExtracurricularsByRMController
} from "../../../modules/controllers/sharedControllers";

export const createControllers = () => ({
    getCurriculoController: new GetCurriculoController(),
    getProfileImageController: new GetProfileImageController(),
    getBannerController: new GetBannerController(),
    searchUserController: new SearchUserController(),
    getVagasController: new GetVagasController(),
    getVagaController: new GetVagaController(),
    getExtracurricularsByRMController: new GetExtracurricularsByRMController()
});