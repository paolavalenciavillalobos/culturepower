import { CreateProductDto } from "../dto/createProductDto"
import { UpdateProductDto } from "../dto/updateProductDto"
import { Product } from "../model/productModel"

export interface IProductRepository {
    createProduct(productData: CreateProductDto): Promise<Product | null>
    getAll(): Promise<Product[]>
    getById(id: string): Promise<Product | null>
    updateProduct(id: string, dataUpdate: UpdateProductDto): Promise<Product | null>
    softDeleteProduct(id: string): Promise<Product | null>
}