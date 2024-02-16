import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'

/*export class VerifyRoleUser {
    static async verify (req: Request, res: Response, next: NextFunction) {
        const { headers } = req
    if (!user) {
        return res.status(401).json('Unauthorized: User not authenticated')
    }
    if(user.role === 'admin'){
        return next()
    }
    return res.status(401).json('Unauthorized: Admin access required')
}}*/

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { headers } = req
    if (!headers.authorization) {
       throw new Error('token not found')
    }

    const [, token] = headers.authorization.split(" ")
    const tokenDecoded = jwt.decode(token) as Token
    console.log('role:',tokenDecoded.role)

    if(!tokenDecoded){
        throw new Error('cannot decoded token')
    }

    if(tokenDecoded.role === undefined){
        throw new Error('user role is undefined')
    } 

    if(tokenDecoded.role === 'admin'){
        
        next()
    } 
    throw new Error('user is not admin')

}

type Token = { role: string }