
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

    describe('findUserByEmail', () => {
        it('should return an email', async () => {
            const newEmail = {
                email: 'nuevoCorreoElectronico@example.com'
            }
            const email = await userService.findUserByEmail(newEmail)
            expect(email).toEqual(fakeUser.email)
        })
        it('Should return an error if cannot find an email', async () => {
            vi.spyOn(fakeUserRepository, 'findUserByEmail').mockImplementationOnce(() => Promise.resolve(null) )
            expect(userService.findUserByEmail(fakeUser.email)).rejects.toThrowError('cannot find this user email')
        })
    })

    describe('updateUser', () => {
         it('Should update a user successfully', async () => {
            const dataUpdate = {
                name: 'nuevoNombreDeUsuario',
                email: 'nuevoCorreoElectronico@example.com'
            }
            const updatedUser = await userService.updateUser(fakeObjectId, dataUpdate)
            expect(updatedUser).toEqual(fakeUser)
            
         })
        /*it('Should throw an error if user ID is invalid', async () => {
            const dataUpdate = {
                username: 'nuevoNombreDeUsuario',
                email: 'nuevoCorreoElectronico@example.com'
            }
            vi.spyOn(fakeUserRepository, 'getById').mockImplementationOnce(() => Promise.resolve(null) )
            expect(userService.getById(fakeObjectId)).rejects.toThrowError('cannot find this user')
            await expect(userService.updateUser('fakeInvalidUserId', dataUpdate)).rejects.toThrowError('id is invalid');
        })*/
    
        it('Should throw an error if updateUser fails', async () => {
            vi.spyOn(fakeUserRepository, 'updateUser').mockResolvedValueOnce(null)
            expect(userService.updateUser(fakeObjectId, fakeUser)).rejects.toThrow('User cannot updated')
        })
        })
    
        describe('createUser', () => {
            it('Should return an user', async () => {
                const dataUser = {
                    name: 'nuevoNombreDeUsuario',
                    email: 'nuevoCorreoElectronico@example.com',
                    password: '8777898'
                }
                const newUser = await userService.createUser(dataUser)
                expect(newUser).toEqual(fakeUser)
            })
    
            it('Should throw an error if createUser fails', async () => {
                vi.spyOn(fakeUserRepository, 'createUser').mockResolvedValueOnce(null)
                expect(userService.createUser(fakeUser)).rejects.toThrow('create user failed')
            })
        })

        describe('softDelete', () => {
            it('Should return an user', async () => {
                const existingUser = await userService.softDelete(fakeObjectId)
                expect(existingUser).toEqual(fakeUser)
            })
    
            it('Should throw an error if softDelete fails', async () => {
                vi.spyOn(fakeUserRepository, 'softDelete').mockResolvedValueOnce(null)
                expect(userService.softDelete(fakeObjectId)).rejects.toThrow('cannot delete this user')
            })
        })

        describe('updateJewelAmount', () => {
            it('Should update a user jewels amount successfully', async () => {
               const jewelsAmount = 10
               const updatedJewelsAmount = await userService.updateJewelAmount(fakeObjectId, jewelsAmount)
               expect(updatedJewelsAmount).toEqual(fakeUser.jewelsAmount)
               
            })
       
           it('Should throw an error if updateJewelsAmount fails', async () => {
               const jewelsAmount = 10
               vi.spyOn(fakeUserRepository, 'updateJewel').mockResolvedValueOnce(null)
               expect(userService.updateJewelAmount(fakeObjectId, jewelsAmount)).rejects.toThrow('User cannot updated')
           })
           })

        describe('loginUser', () => {
            it('Should login an user', async () => {
                const loginUser = await userService.loginUser(fakeUser)
                expect(loginUser).toEqual(fakeUser)
            })
            it('Should throw an error if loginUser fails', async () => {
                vi.spyOn(fakeUserRepository, 'findUserByEmail').mockResolvedValueOnce(null)
                expect(userService.loginUser(fakeUser)).rejects.toThrow('An unexpected error occurred.')
            })
    
        })

        describe('updateProductUser', () => {
            it('Should update array product user', async () => {
                const updateProductUser = await userService.updateProductUser(fakeObjectId, fakeObjectId)
                expect(updateProductUser).toEqual(fakeUser.products)
            })
            it('Should throw an error if updateProductUser fails', async () => {
                vi.spyOn(fakeUserRepository, 'updateProductUser').mockResolvedValueOnce(null)
                expect(userService.updateProductUser(fakeObjectId, fakeObjectId)).rejects.toThrow('cannot updated Product array from user')
            })
    
        })
    
})