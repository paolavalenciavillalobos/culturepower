import { Request, Response } from "express";

export interface IUserController {
    createUser(req: Request, res: Response): Promise<void>
    findUserByEmail(req: Request, res: Response): Promise<void>
    loginUser(req: Request, res: Response): Promise<void>
    getById(req: Request, res: Response): Promise<void>
    updateUser(req: Request, res: Response): Promise<void>
    softDelete(req: Request, res: Response): Promise<void>
}