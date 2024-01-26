//capaz de logar/ and CRUD

import { CreateUserDto } from "../dtos/createUserDto"
import { UpdateUserDto } from "../dtos/updateUserDto"
import { User } from "../model/userModel"
import bcrypt from 'bcrypt'
import { IUserService } from "./userServiceInterface"
import { IUserRepository } from "../repository/userRepositoryInterface"

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository){}

    async createUser(userData: CreateUserDto): Promise<User | null> {
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