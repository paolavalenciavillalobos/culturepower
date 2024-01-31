export class CreateUserDto {
    name: string
    email: string 
    password: string 
    constructor(userData: CreateUser) {
        this.name = userData.name,
        this.email = userData.email,
        this.password = userData.password
    }
}

type CreateUser = {
    name: string,
    email: string,
    password: string
}