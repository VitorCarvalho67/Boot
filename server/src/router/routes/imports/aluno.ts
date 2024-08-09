import {
    CreateVinculoController,
    AcceptVinculoController,
    GetVinculosController,
    GetVinculosProfileController,
    IgnoreVinculoController,
    GetUnlinkedsController,
    GetCursosController,
    DeleteVinculoController,
    CreateMessageController
} from "../../../modules/controllers/sharedControllers";
import {
    CreateAlunoController,
    ValidateAlunoController,
    LoginAlunoController,
    RecoveryAlunoController,
    ValidateRecoveryController,
    CompleteAlunoController,
    UpdateCurriculoController,
    GetCourseYearController,
    GetCurriculoController,
    GetMeController,
    RefreshTokenController,
    UploadImgProfileController,
    UploadCapaController,
    ChangePassController,
    GetLastMessagesController,
    GetMessagesBetweenController,
    RegisterExtracurricularController,
    EditExtracurricularController,
    ExcludeExtracurricularController,
    SendBoletimController,
    GetExtracurricularesController
} from "../../../modules/controllers/alunoControllers";

export const createControllers = () => ({
    createAlunoController: new CreateAlunoController(),
    validateAlunoController: new ValidateAlunoController(),
    loginAlunoController: new LoginAlunoController(),
    recoveryAlunoController: new RecoveryAlunoController(),
    validateRecoveryController: new ValidateRecoveryController(),
    completeAlunoController: new CompleteAlunoController(),
    updateCurriculoController: new UpdateCurriculoController(),
    createVinculoController: new CreateVinculoController(),
    acceptVinculoController: new AcceptVinculoController(),
    ignoreVinculoController: new IgnoreVinculoController(),
    getVinculosController: new GetVinculosController(),
    getVinculosProfileController: new GetVinculosProfileController(),
    getUnlinkedsController: new GetUnlinkedsController(),
    getCursosController: new GetCursosController(),
    getCourseYearController: new GetCourseYearController(),
    getCurriculoController: new GetCurriculoController(),
    getMeController: new GetMeController(),
    deleteVinculoController: new DeleteVinculoController(),
    refreshTokenController: new RefreshTokenController(),
    uploadImgProfileController: new UploadImgProfileController(),
    uploadCapaController: new UploadCapaController(),
    changePassController: new ChangePassController(),
    createMessageController: new CreateMessageController(),
    getLastMessagesController: new GetLastMessagesController(),
    getMessagesBetweenController: new GetMessagesBetweenController(),
    registerExtracurricularController: new RegisterExtracurricularController(),
    editExtracurricularController: new EditExtracurricularController(),
    excludeExtracurricularController: new ExcludeExtracurricularController(),
    sendBoletimController: new SendBoletimController(),
    getExtracurricularesController: new GetExtracurricularesController()
});