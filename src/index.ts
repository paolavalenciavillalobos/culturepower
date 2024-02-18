import express from 'express'
import dotenv from 'dotenv'
import { MongoConnection } from './database/mongoConnect'
import { userRoutes } from './user/routes/userRoutes'
import { productRoutes } from './product/routes/productRoutes'


dotenv.config()
MongoConnection.initialize()

export const app = express()
app.use(express.json())

app.use(userRoutes)
app.use(productRoutes)

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))

