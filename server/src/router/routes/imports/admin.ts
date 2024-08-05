import {
    GetCursosController
} from "../../../modules/controllers/sharedControllers"
import {
    LoginAdminController,
    RegisterCursosController,
    RegisterProfessorController,
    RegisterFuncionarioController,
    RegisterCoordenadorController,
    GetAllProfessoresController,
    GetAllCoordenadoresController,
    RegisterTurmaController,
    RefreshTokenController,
    GetFullProfessoresController,
    GetFullCoordenadoresController,
    GetFullCursosController,
    GetFullEstagiosController,
    GetFullFuncionariosController,
    GetFullTurmasController
} from "../../../modules/controllers/adminControllers";

export const createControllers = () => ({
    loginAdminController: new LoginAdminController(),
    registerCursosController: new RegisterCursosController(),
    registerProfessorController: new RegisterProfessorController(),
    registerFuncionarioController: new RegisterFuncionarioController(),
    registerCoordenadorController: new RegisterCoordenadorController(),
    registerTurmaController: new RegisterTurmaController(),
    getCursosController: new GetCursosController(),
    refreshTokenController: new RefreshTokenController(),
    getAllProfessoresController: new GetAllProfessoresController(),
    getAllCoordenadoresController: new GetAllCoordenadoresController(),
    getFullProfessoresController: new GetFullProfessoresController(),
    getFullCoordenadoresController: new GetFullCoordenadoresController(),
    getFullCursosController: new GetFullCursosController(),
    getFullEstagiosController: new GetFullEstagiosController(),
    getFullFuncionariosController: new GetFullFuncionariosController(),
    getFullTurmasController: new GetFullTurmasController()

});