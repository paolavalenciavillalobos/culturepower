import {Router} from 'express'
import { productFactoryModule } from '../factory/productFactory'

export const productRoutes = Router()

productRoutes.post('/product/create',  productFactoryModule.createProduct.bind(productFactoryModule))
productRoutes.get('/product/list',  productFactoryModule.getAll.bind(productFactoryModule))
productRoutes.get('/product/:id',  productFactoryModule.getById.bind(productFactoryModule))
productRoutes.put('/product/:id',  productFactoryModule.updateProduct.bind(productFactoryModule))
productRoutes.put('/product/delete/:id',  productFactoryModule.softDeleteProduct.bind(productFactoryModule))