import { ProductModel } from "../../product/model/productModel";
import { ProductRepository } from "../../product/repository/productRepository";
import { UserController } from "../controller/userController";
import { UserModel } from "../model/userModel";
import { UserRepository } from "../repository/userRepository";
import { UserService } from "../service/userService";

class UserFactory {
    static createInstance() {
        const userRepository = new UserRepository(UserModel)
        const productRepository = new ProductRepository(ProductModel)
        const userService = new UserService(userRepository, productRepository)
        const userController = new UserController(userService)
        return userController
    }
}

export const userFactoryModule = UserFactory.createInstance()