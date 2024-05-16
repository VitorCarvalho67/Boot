import { Router } from "express";
import { empresaAuthMiddleware } from '../../middleware/autentication';
import {
    RegisterEmpresaController,
    ValidateEmpresaController,
    LoginEmpresaController,
    RecoveryEmpresaController,
    ValidateRecoveryEmpresaController
} from "../../modules/controllers/empresaControllers";


const registerEmpresaController = new RegisterEmpresaController();
const validateEmpresaController = new ValidateEmpresaController();
const loginEmpresaController = new LoginEmpresaController();
const recoveryEmpresaController = new RecoveryEmpresaController();
const validateRecoveryEmpresaController= new ValidateRecoveryEmpresaController();

const empresaRoutes = Router();

empresaRoutes.post("/register", registerEmpresaController.handle);
empresaRoutes.post("/register/validate", validateEmpresaController.handle);
empresaRoutes.post("/login", loginEmpresaController.handle);
empresaRoutes.post("/recovery", recoveryEmpresaController.handle);
empresaRoutes.post("/recovery/validate", validateRecoveryEmpresaController.handle);

empresaRoutes.get("/auth", empresaAuthMiddleware, (req, res) => {
    res.status(200).send("Empresa autenticada com sucesso.");
});

export { empresaRoutes };