import { IProductService } from "../service/productServiceInterface"
import { Request, Response } from "express"
import { IProductController } from './productControllerInterface'

export class ProductController implements IProductController {

    constructor(private productService: IProductService){}

   async createProduct(req: Request, res: Response): Promise<void> {
        try{
            const { body } = req
            const newProduct = await this.productService.createProduct(body)
            res.status(200).json(newProduct)
        }catch(e: any){
            res.status(500).json(e)
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try{
            const user =  await this.productService.getAll()
            res.status(200).json(user)
        }catch(e: any) {
            res.status(500).json(e)
        }
        
    }


    async getById(req: Request, res: Response): Promise<void> {
        try{
            const {id} = req.params
            const user =  await this.productService.getById(id)
            res.status(200).json(user)
        }catch(e: any) {
            res.status(500).json(e)
        }
        
    }

    async updateProduct(req: Request, res: Response): Promise<void> {
        try{
            const {id} = req.params
            const {body} = req
            const updated = await this.productService.updateProduct(id, body)
            res.status(200).json(updated)
        }catch(e: any) {
            res.status(500).json(e)
        }
    }

    
    async softDeleteProduct(req: Request, res: Response): Promise<void>  {
        try{
            const {id} = req.params
            const deleted = await this.productService.softDeleteProduct(id)
            res.status(200).json(deleted)
        }catch(e: any){
            res.status(500).json(e)
        }
        
    }


}