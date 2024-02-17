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
        return res.status(401).json('Token not provided');//res
    }

    const [, token] = headers.authorization.split(" ")
    const tokenDecoded = jwt.decode(token) as Token
    console.log('role:',tokenDecoded)

    if(!tokenDecoded){
        return res.status(401).json('cannot decoded token');
    }

    if(tokenDecoded.role === undefined){
        return res.status(401).json('user role is undefined')
    } 

    if(tokenDecoded.role === 'admin'){
        
       return next()
    } 
    res.status(401).json('user is not admin')

}

type Token = { role: string }