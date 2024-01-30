export class CreateProductDto {
    name: string
    value: number
    amount: number
    description: string
    photo?: string
    constructor(productData: CreateProduct) {
        this.name = productData.name,
        this.value = productData.value,
        this.amount = productData.amount,
        this.description = productData.description,
        this.photo = productData?.photo
    }
}

type CreateProduct = {
    name: string,
    value: number,
    amount: number,
    description: string,
    photo?: string,
}