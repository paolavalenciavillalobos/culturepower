import { IUserService } from "../service/userServiceInterface"
import { Request, Response } from "express"

export class UserController {

    constructor(private userService: IUserService){}

   /* async createUser(userData: CreateUserDto): Promise<User | null> {
        userData.password = await bcrypt.hash(userData.password, 5)
        const newUser = await this.userRepository.createUser(userData)
        if(!newUser){
            throw new Error('create user failed')
        }
        return newUser
    }*/
    async findUserByEmail(req: Request, res: Response): Promise<void> {
        try{
            const {email} = req.query
            const user = await this.userService.findUserByEmail(email as string)
            res.status(200).json(user)
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
}