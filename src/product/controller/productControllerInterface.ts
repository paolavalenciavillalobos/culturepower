import { Request, Response } from "express"

export interface IProductController {
    createProduct(req: Request, res: Response): Promise<void>
    getAll(req: Request, res: Response): Promise<void>
    getById(req: Request, res: Response): Promise<void>
    updateProduct(req: Request, res: Response): Promise<void>
    softDeleteProduct(req: Request, res: Response): Promise<void>
}