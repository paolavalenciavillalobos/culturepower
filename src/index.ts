import express from 'express'
import dotenv from 'dotenv'
import { MongoConnection } from './database/mongoConnect'


dotenv.config()
MongoConnection.initialize()

const app = express()
app.use(express.json())


app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))