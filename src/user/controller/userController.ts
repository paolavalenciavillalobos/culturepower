import { IUserService } from "../service/userServiceInterface"
import { Request, Response } from "express"
import { createValidator } from "../validation/createValidatorYup"
import { loginValidator } from "../validation/loginValidatorYup"
import { IUserController } from "./userControllerInterface"

export class UserController implements IUserController {

    constructor(private userService: IUserService){}

   async createUser(req: Request, res: Response): Promise<void> {
        try{
            const { body } = req
            await createValidator.validate(body, { abortEarly: false })
            const newUser = await this.userService.createUser(body)
            res.status(200).json(newUser)
        }catch(e: any){
            res.status(500).json(e)
        }
    }
    async findUserByEmail(req: Request, res: Response): Promise<void> {
        try{
            const {email} = req.query
            const user = await this.userService.findUserByEmail(email as string)
            res.status(200).json(user)
        }catch(e: any){
            res.status(500).json(e)
        }
       
    }

    async loginUser(req: Request, res: Response): Promise<void> {
        try{
            const { body } = req
            await loginValidator.validate(body, { abortEarly: false })
            const loginUser = await this.userService.loginUser(body)
            res.status(200).json(loginUser)
        }catch(e: any){
            res.status(500).json(e)
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try{
            const {id} = req.params
            const user =  await this.userService.getById(id)
            res.status(200).json(user)
        }catch(e: any) {
            res.status(500).json(e)
        }
        
    }
    async updateUser(req: Request, res: Response): Promise<void> {
        try{
            const {id} = req.params
            const {body} = req
            const updated = await this.userService.updateUser(id, body)
            res.status(200).json(updated)
        }catch(e: any) {
            res.status(500).json(e)
        }
    }
    
    async softDelete(req: Request, res: Response): Promise<void>  {
        try{
            const {id} = req.params
            const deleted = await this.userService.softDelete(id)
            res.status(200).json(deleted)
        }catch(e: any){
            res.status(500).json(e)
        }
        
    }

    //ENVIAR JOIA

    async updateJewelAmount(req: Request, res: Response): Promise<void> {
        try{
            const {id} = req.params
            const {body} = req
            const updated = await this.userService.updateJewelAmount(id, body)
            res.status(200).json(updated)
        }catch(e: any) {
            res.status(500).json(e)
        }
    }

    //ATUALIZAR ARRAY DE PRODUCTS DE USUARIO

    async updateProductUser (req: Request, res: Response): Promise<void> {
        try{
            const {idUser,idProduct} = req.params
            const updated = await this.userService.updateProductUser(idUser, idProduct)
            console.log(updated)
            res.status(200).json(updated)
        }catch(e: any) {
            res.status(500).json({message: e.message})
        }
    }


}