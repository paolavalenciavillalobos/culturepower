export class CreateUserDto {
    name: string
    email: string 
    password: string 
    photo: string
    role: string
    constructor(userData: CreateUser) {
        this.name = userData.name,
        this.email = userData.email,
        this.password = userData.password,
        this.photo = userData.photo,
        this.role = userData.role
    }
}

type CreateUser = {
    name: string,
    email: string,
    password: string,
    photo: string,
    role: string
}