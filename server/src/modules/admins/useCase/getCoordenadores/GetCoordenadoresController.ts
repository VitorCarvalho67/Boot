import { Request, Response } from "express";
import { GetCoordenadorUseCase } from "./GetCoordenadoresUseCase";

export class GetCoordenadorController {
    async handle(req: Request, res: Response) {

        const getCoordenadorUseCase = new GetCoordenadorUseCase();

        const result = await getCoordenadorUseCase.execute();

        return res.status(201).json(result);
    }
}