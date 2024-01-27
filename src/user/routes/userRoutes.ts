import {Router} from 'express'
import { userFactoryModule } from '../factory/userFactory'

export const userRoutes = Router()

userRoutes.get('/user',  userFactoryModule.findUserByEmail.bind(userFactoryModule))
userRoutes.get('/user/:id',  userFactoryModule.getById.bind(userFactoryModule))
userRoutes.put('/user/:id',  userFactoryModule.updateUser.bind(userFactoryModule))
userRoutes.put('/user/delete/:id',  userFactoryModule.softDelete.bind(userFactoryModule))