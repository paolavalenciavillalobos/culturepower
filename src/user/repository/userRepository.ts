import { Model, isValidObjectId } from "mongoose"
import { User } from '../model/userModel'
import { CreateUserDto } from "../dtos/createUserDto"

export class UserRepository {
    constructor (private userModel: Model<User>) {}

    async createUser(userData: CreateUserDto): Promise<User | null> {
        const newUser = await this.userModel.create(userData)
        return newUser
    }
    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({email: email})
        return user
    }

    async getProduct() {}
    //async updateUser() {}
    //async deleteUser() {}

}