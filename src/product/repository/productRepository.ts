import { Model, isValidObjectId } from "mongoose"
import { Product } from '../model/productModel'
import { CreateProductDto } from "../dto/createProductDto"
import { UpdateProductDto } from "../dto/updateProductDto"
import { IProductRepository } from "./userRepositoryInterface"
import { error } from "console"

export class ProductRepository implements IProductRepository {
    constructor (private productModel: Model<Product>) {}

    async createProduct(productData: CreateProductDto): Promise<Product | null> {
        const newProduct = await this.productModel.create(productData)
        return newProduct
    }

    async getAll(): Promise<Product[]> {
        const products =  await this.productModel.find()
        return products
    }

    async getById(id: string): Promise<Product | null> {
        const product =  await this.productModel.findById({_id: id, deletedAt: null})
        return product
    }

    async updateProduct(id: string, dataUpdate: UpdateProductDto): Promise<Product | null> {
        if(!isValidObjectId(id)){
            throw new Error(`error: ${id} is not valid.`)
        }

        const updated = await this.productModel.findByIdAndUpdate(id, dataUpdate, { new: true })
        return updated
    }
    
    async softDeleteProduct(id: string): Promise<Product | null>  {
        if(!isValidObjectId(id)){
            throw new Error(`error: ${id} is not valid.`)
        }

        const deleted = await this.productModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
        return deleted
    }

}