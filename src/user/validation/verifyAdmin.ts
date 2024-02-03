import { Request } from "express"
import jwt from 'jsonwebtoken'

export const verifyAdmin = (req: Request) => {
    const { headers } = req
    if (!headers.authorization) {
       throw new Error('token not found')
    }

    const [, token] = headers.authorization.split(" ")
    const tokenDecoded = jwt.decode(token) as Token

    if(!tokenDecoded){
        throw new Error('cannot decoded token')
    }

    if(tokenDecoded.role === 'admin'){
        return true
    } 
    throw new Error('user is not admin')

}

type Token = { role: string }
