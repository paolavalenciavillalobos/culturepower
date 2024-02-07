export class CreateUserDto {
    name: string
    email: string 
    password: string 
    photo: string
    constructor(userData: CreateUser) {
        this.name = userData.name,
        this.email = userData.email,
        this.password = userData.password,
        this.photo = userData.photo
    }
}

type CreateUser = {
    name: string,
    email: string,
    password: string,
    photo: string
}