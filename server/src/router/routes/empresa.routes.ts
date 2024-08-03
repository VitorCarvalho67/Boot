import { Router } from "express";
import { empresaAuthMiddleware } from '../../middleware/auth/autentication';
import { createControllers } from "./imports/empresa";

const controllers = createControllers();
const empresaRoutes = Router();

empresaRoutes.post("/register", controllers.registerEmpresaController.handle);
empresaRoutes.post("/register/validate", controllers.validateEmpresaController.handle);
empresaRoutes.post("/login", controllers.loginEmpresaController.handle);
empresaRoutes.post("/recovery", controllers.recoveryEmpresaController.handle);
empresaRoutes.post("/recovery/validate", controllers.validateRecoveryEmpresaController.handle);

empresaRoutes.use(empresaAuthMiddleware);
empresaRoutes.post("/message/send", controllers.createMessageController.handle);

empresaRoutes.get("/auth", (req, res) => {
    res.status(200).send("Empresa autenticada com sucesso.");
});

empresaRoutes.get("/token/refresh", controllers.refreshTokenController.handle);
empresaRoutes.get("/messages/between", controllers.getMessagesBetweenController.handle);

export { empresaRoutes };