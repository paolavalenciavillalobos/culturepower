import {  test, it, expect } from "vitest"
import request from 'supertest'
import {app} from '../../index'
import { fakeObjectId } from "../../__mocks__/fakeObjectId"
import supertest from "supertest"
import dotenv from 'dotenv'
import { MongoConnection } from "../../database/mongoConnect"
import axios from "axios"

//dotenv.config()
//MongoConnection.initialize()

//const server = supertest(app)

test('should create a new user', async () => {
      const userData = {
        _id: fakeObjectId,
        name: 'testUser',
        email: 'test@example.com',
        password: '09643',
      }
      const response = await axios.post("http://localhost:3000/user/create", userData)
      const result = response.data
      expect(response.status).toEqual(201)
})


/*test('Should update an user', async () => {
  const dataUpdate = { name: 'updated', email: 'updated@example.com' };
  const response = (`/users/${fakeObjectId}`).send(dataUpdate);
  expect(response.status).toBe(200);
})*/
  