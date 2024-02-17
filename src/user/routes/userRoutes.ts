import {Router} from 'express'
import { userFactoryModule } from '../factory/userFactory'
import { AuthenticationMiddleware } from '../../middlewares/authenticationMiddleware'
import { multerMiddleware } from '../../middlewares/multerMiddleware'
import { verifyAdmin } from '../../middlewares/RoleMiddleware'

export const userRoutes = Router()

userRoutes.post('/user/create', multerMiddleware.single("photo"),  userFactoryModule.createUser.bind(userFactoryModule))
userRoutes.get('/user/findEmail', AuthenticationMiddleware.handler,  userFactoryModule.findUserByEmail.bind(userFactoryModule))
userRoutes.post('/user/login', userFactoryModule.loginUser.bind(userFactoryModule))
userRoutes.get('/user/', AuthenticationMiddleware.handler, userFactoryModule.getById.bind(userFactoryModule))
userRoutes.put('/user/:id', AuthenticationMiddleware.handler, multerMiddleware.single("photo"), userFactoryModule.updateUser.bind(userFactoryModule))
userRoutes.put('/user/delete/:id', AuthenticationMiddleware.handler, userFactoryModule.softDelete.bind(userFactoryModule))
userRoutes.put('/user/jewels/:id', AuthenticationMiddleware.handler, verifyAdmin, userFactoryModule.updateJewelAmount.bind(userFactoryModule))
userRoutes.put('/user/:idUser/claims/:idProduct', AuthenticationMiddleware.handler, userFactoryModule.updateProductUser.bind(userFactoryModule))
