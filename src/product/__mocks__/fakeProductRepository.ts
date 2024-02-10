import { IProductRepository } from "../repository/userRepositoryInterface"
import { fakeProduct, fakeProductsArray } from "./fakeProduct"

export const fakeProductRepository = {
    createProduct() {return Promise.resolve(fakeProduct)},
    getAll() {return Promise.resolve(fakeProductsArray)},
    getById() {return Promise.resolve(fakeProduct)},
    updateProduct() {return Promise.resolve(fakeProduct)},
    softDeleteProduct() {return Promise.resolve(fakeProduct)} 
} as unknown as IProductRepository