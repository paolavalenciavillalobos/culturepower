import {Router} from 'express'
import { userFactoryModule } from '../factory/userFactory'
import { AuthenticationMiddleware } from '../../middlewares/authenticationMiddleware'
import { multerMiddleware } from '../../middlewares/multerMiddleware'

export const userRoutes = Router()

userRoutes.post('/user/create', multerMiddleware.single("photo"),  userFactoryModule.createUser.bind(userFactoryModule))
userRoutes.get('/user/findEmail',  userFactoryModule.findUserByEmail.bind(userFactoryModule))
userRoutes.post('/user/login', userFactoryModule.loginUser.bind(userFactoryModule))
userRoutes.get('/user/:id',  userFactoryModule.getById.bind(userFactoryModule))
userRoutes.put('/user/:id', AuthenticationMiddleware.handler,  userFactoryModule.updateUser.bind(userFactoryModule))
userRoutes.put('/user/delete/:id',  userFactoryModule.softDelete.bind(userFactoryModule))
userRoutes.put('/user/jewels/:id', AuthenticationMiddleware.handler,  userFactoryModule.updateJewelAmount.bind(userFactoryModule))
userRoutes.put('/user/:idUser/claims/:idProduct',  userFactoryModule.updateProductUser.bind(userFactoryModule))
