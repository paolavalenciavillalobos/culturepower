export class UpdateUserDto {
    name: string
    email: string
    password: string
    jewelsAmount: number
    products: Product[]
    photo: string
    constructor(userData: updateUser) {
        this.name = userData.name,
        this.email = userData.email,
        this.password = userData.password,
        this.jewelsAmount = userData.jewelsAmount,
        this.products = userData.products,
        this.photo = userData.photo
    }
}

type updateUser = {
    name: string,
    email: string,
    password: string,
    jewelsAmount: number,
    products: Product[],
    photo: string
}