import { fakeObjectId } from "../../__mocks__/fakeObjectId"

export const fakeUser = {
    _id: fakeObjectId,
    name: 'ramdomUser',
    email: 'ramdomemail@email.com',
    password: '898494399304',
    jewelsAmount: 30000,
    products: [],
    photo: 'kiejiroirbjkegr.jpg',
    role: 'client',
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date()
}

