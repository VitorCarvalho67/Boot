import { Request, Response } from "express";
import { GetAllProfessorUseCase } from "./GetAllProfessorUseCase";

export class GetAllProfessorController {
    async handle(req: Request, res: Response) {

        const getAllProfessorUseCase = new GetAllProfessorUseCase();

        const result = await getAllProfessorUseCase.execute();

        return res.status(201).json(result);
    }
}