import { Router } from "express";
import { alunoAuthMiddleware } from '../../middleware/auth/autentication';
import {
    GetCurriculoController
} from "../../modules/controllers/sharedControllers";

const getCurriculoController = new GetCurriculoController();

const sharedRoutes = Router();

sharedRoutes.get("/curriculo", getCurriculoController.handle);

export { sharedRoutes };