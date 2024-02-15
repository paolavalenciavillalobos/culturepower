import { fakeObjectId } from "../../__mocks__/fakeObjectId"
import { fakeProductRepository } from "../../product/__mocks__/fakeProductRepository"
import { expect, describe, it, vi } from "vitest"
import { ProductService } from "./productService"
import { fakeProduct, fakeProductsArray } from "../__mocks__/fakeProduct"



const productService = new ProductService( fakeProductRepository)

describe('ProductService', () => {
    describe('getById', () => {
        it('Should return an product', async () => {
            const product = await productService.getById(fakeObjectId)
            expect(product).toEqual(fakeProduct)
        })
        it('Should return an error if cannot find an product', async () => {
            vi.spyOn(fakeProductRepository, 'getById').mockImplementationOnce(() => Promise.resolve(null) )
            expect(productService.getById(fakeObjectId)).rejects.toThrowError('cannot find this product')
        })
    })

    describe('getAll', () => {
        it('Should return an array of products', async () => {
            const products = await productService.getAll()
            expect(products).toEqual(fakeProductsArray)
        })
        it('Should return an error if cannot find any product', async () => {
            vi.spyOn(fakeProductRepository, 'getAll').mockImplementationOnce(() => Promise.resolve([]) )
            expect(productService.getAll()).rejects.toThrowError("Dont exist any product yet")
        })
    })


    describe('updateProduct', () => {
         it('Should update a product successfully', async () => {
            const dataUpdate = {
                name: 'new product',
                value: 10,
                amount: 2,
                description: 'kjk'
            }
            const updatedProduct = await productService.updateProduct(fakeObjectId, dataUpdate)
            expect(updatedProduct).toEqual(fakeProduct)
            
         })
        it('Should throw an error if updateProduct fails', async () => {
            vi.spyOn(fakeProductRepository, 'updateProduct').mockResolvedValueOnce(null)
            expect(productService.updateProduct(fakeObjectId, fakeProduct)).rejects.toThrow('Product cannot updated')
        })
        })
    
        describe('createProduct', () => {
            it('Should create a new product', async () => {
                const dataProduct = {
                    name: 'nuevoNombreDeUsuario',
                    value: 10,
                    amount: 2,
                    description: 'kjk'
                }
                const newProduct = await productService.createProduct(dataProduct)
                expect(newProduct).toEqual(fakeProduct)
            })
        })

        describe('softDeleteProduct', () => {
            it('Should return an product', async () => {
                const existingProduct = await productService.softDeleteProduct(fakeObjectId)
                expect(existingProduct).toEqual(fakeProduct)
            })
    
            it('Should throw an error if softDelete fails', async () => {
                vi.spyOn(fakeProductRepository, 'softDeleteProduct').mockResolvedValueOnce(null)
                expect(productService.softDeleteProduct(fakeObjectId)).rejects.toThrow('cannot delete this product')
            })
        })

    
})