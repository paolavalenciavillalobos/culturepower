import { CreateUserDto } from "../dtos/createUserDto"
import { JewelsUpdateDto } from "../dtos/jewelUpdateDto"
import { LoginDataDTO } from "../dtos/loginDataDto"
import { UpdateUserDto } from "../dtos/updateUserDto"
import { User } from "../model/userModel"

export interface IUserService {
createUser(userData: CreateUserDto): Promise<User | null>
findUserByEmail(email: string): Promise<User | null>
loginUser(loginData: LoginDataDTO): Promise<string>
getById(id: string): Promise<User | null>
updateUser(id: string, dataUpdate: UpdateUserDto): Promise<User | null>
softDelete(id: string): Promise<User | null>
updateJewelAmount(id: string, jewelUpdate: JewelsUpdateDto): Promise<User | null>
updateProductUser(idUser: string, idProduct: string): Promise<User | null>
}
