//capaz de logar/ and CRUD

import { CreateUserDto } from "../dtos/createUserDto"
import { UpdateUserDto } from "../dtos/updateUserDto"
import { User } from "../model/userModel"
import bcrypt from 'bcrypt'
import { IUserService } from "./userServiceInterface"
import { IUserRepository } from "../repository/userRepositoryInterface"
import jwt from 'jsonwebtoken'
import { LoginDataDTO } from "../dtos/loginDataDto"

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository){}

    async createUser(userData: CreateUserDto): Promise<User | null> {
        const existingUser = await this.findUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        userData.password = await bcrypt.hash(userData.password, 5)
        const newUser = await this.userRepository.createUser(userData)
        if(!newUser){
            throw new Error('create user failed')
        }
        return newUser
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findUserByEmail(email)
        if(!user){
            throw new Error('cannot find this user email')
        }
        return user
    }

    async loginUser(loginData: LoginDataDTO): Promise<string>{
        try {
        const userLogin = await this.findUserByEmail(loginData.email)
        
        if(!userLogin || !userLogin.password){
          throw new Error('User not found.')
        }
    
        const userPassword = userLogin.password as string

        const validPasswordUser = await bcrypt.compare(loginData.password, userPassword)
    
        if(!validPasswordUser){
          throw new Error('Invalid email/password.')
        }
    
    
        userLogin.password = null
        delete userLogin.password
    
        const payload = {...userLogin}
        const secretKey = process.env.JWT_SECRET_KEY as string
        const options = { expiresIn: '1h'}
    
        const token = jwt.sign(payload, secretKey, options)
    
        return token
      }
     catch (error: any) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('An unexpected error occurred.')
        }
    }
}


    async getById(id: string): Promise<User | null> {
        const user =  await this.userRepository.getById(id)
        if(!user){
            throw new Error('cannot find this user')
        }
        return user
    }
    async updateUser(id: string, dataUpdate: UpdateUserDto): Promise<User | null> {
        const validId = await this.userRepository.getById(id)
        if(!validId){
            throw new Error('id is invalid')
        }

        const updated = await this.userRepository.updateUser(id, dataUpdate)
        if(!updated){
            throw new Error('User cannot updated')
        }
        return updated
    }
    
    async softDelete(id: string): Promise<User | null>  {
        const validId = await this.userRepository.getById(id)
        if(!validId){
            throw new Error('id is invalid')
        }
        
        const deleted = await this.userRepository.softDelete(id)
        if(!deleted){
            throw new Error ('cannot delete this user')
        }
        return deleted
    }
}