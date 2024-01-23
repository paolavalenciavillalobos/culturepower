export class CreateUserDto {
    name: string
    email: string
    password: string
    jewelsAmount: number
    products: Product[]
    photo: string
    constructor(userData: CreateUser) {
        this.name = userData.name,
        this.email = userData.email,
        this.password = userData.password,
        this.jewelsAmount = userData.jewelsAmount,
        this.products = userData.products,
        this.photo = userData.photo
    }
}

type CreateUser = {
    name: string,
    email: string,
    password: string,
    jewelsAmount: number,
    products: Product[],
    photo: string
}