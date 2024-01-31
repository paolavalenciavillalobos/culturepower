export class UpdateUserDto {
    name: string
    email: string
    password: string
    photo: string
    constructor(userData: updateUser) {
        this.name = userData.name,
        this.email = userData.email,
        this.password = userData.password,
        this.photo = userData.photo
    }
}

type updateUser = {
    name: string,
    email: string,
    password: string,
    photo: string
}