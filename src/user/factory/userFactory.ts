import { UserController } from "../controller/userController";
import { UserModel } from "../model/userModel";
import { UserRepository } from "../repository/userRepository";
import { UserService } from "../service/userService";

class UserFactory {
    static createInstance() {
        const userRepository = new UserRepository(UserModel)
        const userService = new UserService(userRepository)
        const userController = new UserController(userService)
        return userController
    }
}

export const userFactoryModule = UserFactory.createInstance()