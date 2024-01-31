import { ProductController } from "../controller/productController"
import { ProductModel } from "../model/productModel"
import { ProductRepository } from "../repository/productRepository"
import { ProductService } from "../service/productService"


class ProductFactory {
    static createInstance() {
        const productRepository = new ProductRepository(ProductModel)
        const productService = new ProductService(productRepository)
        const productController = new ProductController(productService)
        return productController
    }
}

export const productFactoryModule = ProductFactory.createInstance()