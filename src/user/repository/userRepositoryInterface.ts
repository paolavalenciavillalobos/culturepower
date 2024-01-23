import { CreateUserDto } from "../dtos/createUserDto";
import { User } from '../model/userModel'

export interface IUserRepository  {
    createUser(userData: CreateUserDto): Promise<User | null>
    findUserByEmail(email: string): Promise<User | null>
}