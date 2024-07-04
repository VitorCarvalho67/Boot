import {
    GetCursosController
} from "../../../modules/controllers/sharedControllers"
import {
    LoginAdminController,
    RegisterCursosController,
    RegisterProfessorController,
    RegisterFuncionarioController,
    RegisterCoordenadorController,
    GetAllProfessorController,
    GetCoordenadorController,
    RegisterTurmaController,
    RefreshTokenController
} from "../../../modules/controllers/adminControllers";

export const createControllers = () => ({
    loginAdminController: new LoginAdminController(),
    registerCursosController: new RegisterCursosController(),
    registerProfessorController: new RegisterProfessorController(),
    registerFuncionarioController: new RegisterFuncionarioController(),
    registerCoordenadorController: new RegisterCoordenadorController(),
    registerTurmaController: new RegisterTurmaController(),
    getAllProfessorController: new GetAllProfessorController(),
    getCoordenadoresController: new GetCoordenadorController(),
    getCursosController: new GetCursosController(),
    refreshTokenController: new RefreshTokenController(),
});