import {
    RegisterEmpresaController,
    ValidateEmpresaController,
    LoginEmpresaController,
    RecoveryEmpresaController,
    ValidateRecoveryEmpresaController,
    RefreshTokenController,
    GetMessagesBetweenController,
    UploadImgProfileController,
    UploadCapaController,
    UpdateSiteController,
    GetLastMessagesController,
} from "../../../modules/controllers/empresaControllers";
import {
    CreateMessageController,
} from "../../../modules/controllers/sharedControllers";

export const createControllers = () => ({
    registerEmpresaController: new RegisterEmpresaController(),
    validateEmpresaController: new ValidateEmpresaController(),
    loginEmpresaController: new LoginEmpresaController(),
    recoveryEmpresaController: new RecoveryEmpresaController(),
    validateRecoveryEmpresaController: new ValidateRecoveryEmpresaController(),
    refreshTokenController: new RefreshTokenController(),
    createMessageController: new CreateMessageController(),
    getMessagesBetweenController: new GetMessagesBetweenController(),
    uploadImgProfileController: new UploadImgProfileController(),
    uploadCapaController: new UploadCapaController(),
    UpdateSiteController: new UpdateSiteController(),
    getLastMessagesController: new GetLastMessagesController(),
});