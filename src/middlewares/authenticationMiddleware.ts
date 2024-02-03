import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'


export class AuthenticationMiddleware {
    static async handler (req: Request, res: Response, next: NextFunction) {
        const { headers } = req
       // const token = req.headers.authorization.split(' ')[1] as string
        if (!headers.authorization) {
            return res.status(401).json('Token not provided');
        }
        const [, token] = headers.authorization.split(" ")
        try {
           // jwt.verify(token, process.env.JWT_SECRET_KEY as string)
            const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
            
            console.log(tokenDecoded)
            const tokenDecodedRole = jwt.decode(token)
            console.log(tokenDecodedRole)
            next()
        }catch(e: any){
            res.status(401).json('No authorized')
        }
        //next()
    }
}