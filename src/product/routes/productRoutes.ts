import {Router} from 'express'
import { productFactoryModule } from '../factory/productFactory'
import { verifyAdmin } from '../../middlewares/RoleMiddleware'
import { AuthenticationMiddleware } from '../../middlewares/authenticationMiddleware'
import { multerMiddleware } from '../../middlewares/multerMiddleware'

export const productRoutes = Router()

productRoutes.post('/product/create', AuthenticationMiddleware.handler, verifyAdmin, multerMiddleware.single("photo"),  productFactoryModule.createProduct.bind(productFactoryModule))
productRoutes.get('/product/list', AuthenticationMiddleware.handler, productFactoryModule.getAll.bind(productFactoryModule))
productRoutes.get('/product/:id', AuthenticationMiddleware.handler, productFactoryModule.getById.bind(productFactoryModule))
productRoutes.put('/product/:id', AuthenticationMiddleware.handler, verifyAdmin, multerMiddleware.single("photo"),  productFactoryModule.updateProduct.bind(productFactoryModule))
productRoutes.put('/product/delete/:id', AuthenticationMiddleware.handler, verifyAdmin,  productFactoryModule.softDeleteProduct.bind(productFactoryModule))