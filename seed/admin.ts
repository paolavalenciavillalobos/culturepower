import "dotenv/config"
import { UserModel } from '../src/user/model/userModel'
import { MongoConnection } from "../src/database/mongoConnect"
import bcrypt from "bcrypt"

async function adminseed() {
  await MongoConnection.initialize()
  const hasher = new Encrypt()
  await UserModel.create({
    name: "admin",
    password: await hasher.encrypt("1234"),
    email: 'adminseed@email.com',
    role: 'admin'
  })
}

adminseed()

class Encrypt {
    async encrypt(value: string): Promise<string> {
      return bcrypt.hash(value, 3)
    }
  }