export class UpdateProductDto {
    name: string
    value: number
    amount: number
    description: string
    photo?: string
    constructor(productData: UpdateProduct) {
        this.name = productData.name,
        this.value = productData.value,
        this.amount = productData.amount,
        this.description = productData.description,
        this.photo = productData?.photo
    }
}

type UpdateProduct = {
    name: string,
    value: number,
    amount: number,
    description: string,
    photo?: string,
}