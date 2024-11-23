import { Router } from "express";
import { empresaAuthMiddleware } from '../../middleware/auth/autentication';
import { createControllers } from "./imports/empresa";
import multer from "multer";

const controllers = createControllers();
const empresaRoutes = Router();
const upload = multer({ dest: 'uploads/' });

empresaRoutes.post("/register", controllers.registerEmpresaController.handle);
empresaRoutes.post("/register/validate", controllers.validateEmpresaController.handle);
empresaRoutes.post("/login", controllers.loginEmpresaController.handle);
empresaRoutes.post("/recovery", controllers.recoveryEmpresaController.handle);
empresaRoutes.post("/recovery/validate", controllers.validateRecoveryEmpresaController.handle);

empresaRoutes.post('/upload/image/banner', upload.single('file'), empresaAuthMiddleware, controllers.uploadCapaController.handle);
empresaRoutes.post('/upload/image/profile', upload.single('file'), empresaAuthMiddleware, controllers.uploadImgProfileController.handle);


empresaRoutes.use(empresaAuthMiddleware);
empresaRoutes.post("/message/send", controllers.createMessageController.handle);
empresaRoutes.post("/update/site", controllers.UpdateSiteController.handle);

empresaRoutes.get("/auth", (req, res) => {
    res.status(200).send("Empresa autenticada com sucesso.");
});

empresaRoutes.get("/token/refresh", controllers.refreshTokenController.handle);
empresaRoutes.get("/messages", controllers.getLastMessagesController.handle);
empresaRoutes.get("/messages/between", controllers.getMessagesBetweenController.handle);

export { empresaRoutes };