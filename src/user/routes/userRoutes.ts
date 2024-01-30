import {Router} from 'express'
import { userFactoryModule } from '../factory/userFactory'

export const userRoutes = Router()

userRoutes.post('/user/create',  userFactoryModule.createUser.bind(userFactoryModule))
userRoutes.get('/user/findEmail',  userFactoryModule.findUserByEmail.bind(userFactoryModule))
userRoutes.post('/user/login',  userFactoryModule.loginUser.bind(userFactoryModule))
userRoutes.get('/user/:id',  userFactoryModule.getById.bind(userFactoryModule))
userRoutes.put('/user/:id',  userFactoryModule.updateUser.bind(userFactoryModule))
userRoutes.put('/user/delete/:id',  userFactoryModule.softDelete.bind(userFactoryModule))