import { CreateUserDto } from "../dtos/createUserDto";
import { JewelsUpdateDto } from "../dtos/jewelUpdateDto";
import { UpdateUserDto } from "../dtos/updateUserDto";
import { User } from '../model/userModel'

export interface IUserRepository  {
    createUser(userData: CreateUserDto): Promise<User | null>
    findUserByEmail(email: string): Promise<User | null>
    getById(id: string): Promise<User | null>
    updateUser(id: string, dataUpdate: UpdateUserDto): Promise<User | null>
    softDelete(id: string): Promise<User | null> 
    updateJewel(id: string, jewelUpdate: JewelsUpdateDto): Promise<User | null>
    updateProductUser(idUser: string, idProduct: string): Promise<User | null>
}