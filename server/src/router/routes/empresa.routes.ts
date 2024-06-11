import { Router } from "express";
import { empresaAuthMiddleware } from '../../middleware/auth/autentication';
import {
    RegisterEmpresaController,
    ValidateEmpresaController,
    LoginEmpresaController,
    RecoveryEmpresaController,
    ValidateRecoveryEmpresaController,
    RefreshTokenController
} from "../../modules/controllers/empresaControllers";

const createControllers = () => ({
    registerEmpresaController: new RegisterEmpresaController(),
    validateEmpresaController: new ValidateEmpresaController(),
    loginEmpresaController: new LoginEmpresaController(),
    recoveryEmpresaController: new RecoveryEmpresaController(),
    validateRecoveryEmpresaController: new ValidateRecoveryEmpresaController(),
    refreshTokenController: new RefreshTokenController()
});

const controllers = createControllers();
const empresaRoutes = Router();

empresaRoutes.post("/register", controllers.registerEmpresaController.handle);
empresaRoutes.post("/register/validate", controllers.validateEmpresaController.handle);
empresaRoutes.post("/login", controllers.loginEmpresaController.handle);
empresaRoutes.post("/recovery", controllers.recoveryEmpresaController.handle);
empresaRoutes.post("/recovery/validate", controllers.validateRecoveryEmpresaController.handle);

empresaRoutes.get("/auth", empresaAuthMiddleware, (req, res) => {
    res.status(200).send("Empresa autenticada com sucesso.");
});

empresaRoutes.get("/token/refresh", empresaAuthMiddleware, controllers.refreshTokenController.handle);

export { empresaRoutes };