import { NextFunction, Request, Response } from "express"

export class VerifyRoleUser {
    static async verify (req: Request, res: Response, next: NextFunction) {
        const { user } = req
    if (!user) {
        return res.status(401).json('Unauthorized: User not authenticated')
    }
    if(user.role === 'admin'){
        return next()
    }
    return res.status(401).json('Unauthorized: Admin access required')
}}