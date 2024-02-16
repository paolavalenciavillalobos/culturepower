import { IUserRepository } from "../repository/userRepositoryInterface"
import { fakeUser } from "./fakeUser"

export const fakeUserRepository = {
    findUserByEmail() {return Promise.resolve(fakeUser)},
    getById() {return Promise.resolve(fakeUser)},
    createUser() {return Promise.resolve(fakeUser)},
    updateUser() {return Promise.resolve(fakeUser)},
    updateJewel() {return Promise.resolve(fakeUser)},
    softDelete() {return Promise.resolve(fakeUser)},
    updateProductUser() {return Promise.resolve(fakeUser)}
} as unknown as IUserRepository
