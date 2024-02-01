import { CreateProductDto } from "../dto/createProductDto"
import { UpdateProductDto } from "../dto/updateProductDto";
import { Product } from "../model/productModel"
import { IProductRepository } from "../repository/userRepositoryInterface"
import { IProductService } from "./productServiceInterface";


export class ProductService implements IProductService {
    constructor(private productRepository: IProductRepository){}

    async createProduct(productData: CreateProductDto): Promise<Product | null> {
        const newProduct = await this.productRepository.createProduct(productData)
        console.log(newProduct)
        return newProduct
    }

    async getAll(): Promise<Product[]> {
        const products =  await this.productRepository.getAll()
        if(products.length === 0) {
            throw new Error("Dont exist any product yet")
        }
        return products
    }

    async getById(id: string): Promise<Product | null> {
        const product =  await this.productRepository.getById(id)
        if(!product){
            throw new Error('cannot find this product')
        }
        return product
    }

    async updateProduct(id: string, dataUpdate: UpdateProductDto): Promise<Product | null> {
        const validId = await this.productRepository.getById(id)
        if(!validId){
            throw new Error('id is invalid')
        }

        const updated = await this.productRepository.updateProduct(id, dataUpdate)
        if(!updated){
            throw new Error('Product cannot updated')
        }
        return updated
    }
    
    async softDeleteProduct(id: string): Promise<Product | null>  {
        const validId = await this.productRepository.getById(id)
        if(!validId){
            throw new Error('id is invalid')
        }

        const deleted = await this.productRepository.softDeleteProduct(id)
        if(!deleted){
            throw new Error ('cannot delete this product')
        }
        return deleted
    }

}