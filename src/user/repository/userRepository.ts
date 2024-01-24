import { Model, isValidObjectId } from "mongoose"
import { User } from '../model/userModel'
import { CreateUserDto } from "../dtos/createUserDto"
import { IUserRepository } from "./userRepositoryInterface"
import { UpdateUserDto } from "../dtos/updateUserDto"

export class UserRepository implements IUserRepository {
    constructor (private userModel: Model<User>) {}

    async createUser(userData: CreateUserDto): Promise<User | null> {
        const newUser = await this.userModel.create(userData)
        return newUser
    }
    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({email: email})
        return user
    }

    async getById(id: string): Promise<User | null> {
        const user =  await this.userModel.findById({_id: id, deletedAt: null})
        return user
    }
    async updateUser(id: string, dataUpdate: UpdateUserDto): Promise<User | null> {
        if(!isValidObjectId(id)){
            throw new Error(`error: ${id} is not valid.`)
        }

        const updated = await this.userModel.findByIdAndUpdate(id, dataUpdate, { new: true })
        return updated
    }
    
    async softDelete(id: string): Promise<User | null>  {
        if(!isValidObjectId(id)){
            throw new Error(`error: ${id} is not valid.`)
        }

        const deleted = await this.userModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
        return deleted
    }

}