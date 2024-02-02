//capaz de logar/ and CRUD

import { CreateUserDto } from "../dtos/createUserDto"
import { UpdateUserDto } from "../dtos/updateUserDto"
import { User } from "../model/userModel"
import bcrypt from 'bcrypt'
import { IUserService } from "./userServiceInterface"
import { IUserRepository } from "../repository/userRepositoryInterface"
import jwt from 'jsonwebtoken'
import { LoginDataDTO } from "../dtos/loginDataDto"
import { JewelsUpdateDto } from "../dtos/jewelUpdateDto"
import { IProductRepository } from "../../product/repository/userRepositoryInterface"

//, private productRepository: IProductRepository

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository, private productRepository: IProductRepository){}

    //LOGICA DA FOTO

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
    
        const payload = {...userLogin, role: userLogin.role}
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

    //enviar joia
    async updateJewelAmount(id: string, jewelUpdate: JewelsUpdateDto): Promise<User | null> {
        const validId = await this.userRepository.getById(id)
        if(!validId){
            throw new Error('id is invalid')
        }

        const updated = await this.userRepository.updateJewel(id, jewelUpdate)
        if(!updated){
            throw new Error('User cannot updated')
        }
        return updated
    }

    //resgatar produto/atualizar array de produtos em usuario

    async updateProductUser(idUser: string, idProduct: string): Promise<User | null> {
        const user = await this.userRepository.getById(idUser)
        if(!user){
            throw new Error('id is invalid')
        } 

        const product = await this.productRepository.getById(idProduct)
        if (!product) {
        throw new Error('Product ID is invalid or does not exist')
        }

        if (product.amount < 1) {
            throw new Error('Product is out of stock')
        }

        const jewelsAmount = user.jewelsAmount as number

        if (jewelsAmount < product.value) {
            throw new Error('Insufficient jewels')
        }
        const updateAmount = product.amount - 1
        const updatedProduct = await this.productRepository.updateAmount(idProduct, updateAmount );
        if (!updatedProduct) {
            throw new Error('Failed to update product');
        }

        /*if (typeof user.jewelsAmount !== 'number') {
            throw new Error('Invalid type')
        }

        if (user.jewelsAmount < product.value) {
            throw new Error('Insufficient jewels')
        }*/

        const newJewelsAmount = jewelsAmount - product.value
        const updatedUserJewels = await this.userRepository.updateJewel(idUser, { jewelsAmount: newJewelsAmount })
        if (!updatedUserJewels) {
            throw new Error('Failed to update jewels on user');
        }

        const updated = await this.userRepository.updateProductUser(idUser, idProduct)
        if(!updated){
            throw new Error('cannot updated Product array from user')
        }
        console.log(updated)
        return updated
    }
}