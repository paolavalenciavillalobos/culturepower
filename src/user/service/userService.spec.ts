
import { fakeObjectId } from "../../__mocks__/fakeObjectId"
import { fakeProductRepository } from "../../product/__mocks__/fakeProductRepository"
import { fakeUserRepository } from "../__mocks__/fakeUserRepository"
import { UserService } from "./userService"
import { expect, describe, it, vi } from "vitest"
import { fakeUser } from "../__mocks__/fakeUser"


const userService = new UserService(fakeUserRepository, fakeProductRepository)

describe('UserService', () => {
    describe('getById', () => {
        it('Should return an user', async () => {
            const user = await userService.getById(fakeObjectId)
            expect(user).toEqual(fakeUser)
        })
        it('Should return an error if cannot find an user', async () => {
            vi.spyOn(fakeUserRepository, 'getById').mockImplementationOnce(() => Promise.resolve(null) )
            expect(userService.getById(fakeObjectId)).rejects.toThrowError('cannot find this user')
        })
    })
})