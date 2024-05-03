import { Request, Response } from "express";
import { GetCursosUseCase } from "./GetCursosUseCase";

export class GetCursosController {
    async handle(req: Request, res: Response) {

        const getCursoUseCase = new GetCursosUseCase();

        const result = await getCursoUseCase.execute();

        return res.status(201).json(result);
    }
}