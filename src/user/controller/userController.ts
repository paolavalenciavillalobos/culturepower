import { IUserService } from "../service/userServiceInterface"
import { Request, Response } from "express"
import { createValidator } from "../validation/createValidatorYup"
import { loginValidator } from "../validation/loginValidatorYup"
import { IUserController } from "./userControllerInterface"
import { verifyAdmin } from "../validation/verifyAdmin"
import jwt from 'jsonwebtoken'

export class UserController implements IUserController {

    constructor(private userService: IUserService){}

   async createUser(req: Request, res: Response): Promise<void> {
        try{
            console.log(req.file)
            console.log(req.body)
            const { body } = req
            if(req.file){
            body.photo = req.file.filename //
            }
            await createValidator.validate(body, { abortEarly: false })
            const newUser = await this.userService.createUser(body)
            res.status(200).json(newUser)
        }catch(e: any){
            res.status(500).json({message: e.message})
        }
    }
    async findUserByEmail(req: Request, res: Response): Promise<void> {
        try{
            const {email} = req.query
            const user = await this.userService.findUserByEmail(email as string)
            res.status(200).json(user)
        }catch(e: any){
            res.status(500).json({message: e.message})
        }
       
    }

    async loginUser(req: Request, res: Response): Promise<void> {
        try{
            const { body } = req
            await loginValidator.validate(body, { abortEarly: false })
            const loginUser = await this.userService.loginUser(body)
            res.status(200).json(loginUser)
        }catch(e: any){
            res.status(500).json({message: e.message})
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try{
            const { headers } = req
            if (!headers.authorization) {
            throw new Error('token not found')
            }

            const [, token] = headers.authorization.split(" ")
            const tokenDecoded = jwt.decode(token) 
            if (typeof tokenDecoded === 'string' || !tokenDecoded?.id) {
                throw new Error('Invalid token or missing user ID')
            }
            const tokenId = tokenDecoded.id
            console.log(tokenId)
            req = tokenId
            const user =  await this.userService.getById(tokenId)
            res.status(200).json(user)
        }catch(e: any) {
            res.status(500).json({message: e.message})
        }
        
    }

    /*
    async getById(req: Request, res: Response): Promise<void> {
        try{
            const {id} = req.params
            const user =  await this.userService.getById(id)
            res.status(200).json(user)
        }catch(e: any) {
            res.status(500).json(e)
        }
        
    }
    */
    async updateUser(req: Request, res: Response): Promise<void> {
        try{
            const {id} = req.params
            const {body} = req
            const updated = await this.userService.updateUser(id, body)
            res.status(200).json(updated)
        }catch(e: any) {
            res.status(500).json({message: e.message})
        }
    }
    
    async softDelete(req: Request, res: Response): Promise<void>  {
        try{
            const {id} = req.params
            const deleted = await this.userService.softDelete(id)
            res.status(200).json(deleted)
        }catch(e: any){
            res.status(500).json({message: e.message})
        }
        
    }

    //ENVIAR JOIA

    async updateJewelAmount(req: Request, res: Response): Promise<void> {
        try{
            //verifyAdmin(req)
            const {id} = req.params
            const {body} = req
            const updated = await this.userService.updateJewelAmount(id, body)
            res.status(200).json(updated)
        }catch(e: any) {
            res.status(500).json({message: e.message})
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