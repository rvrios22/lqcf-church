import { Request, Response, NextFunction } from "express"

require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10

export const hashPassword = async (plainTextPassword: string) => {
    try {
        const hash = await bcrypt.hash(plainTextPassword, saltRounds)
        return hash
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const comparePasswords = async (plainTextPassword: string, hashedPassword: string) => {
    try {
        const isPasswordCorrect = await bcrypt.compare(plainTextPassword, hashedPassword)
        return isPasswordCorrect
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const assignJWTToken = (user: { admin: boolean, username: string }) => {
    const token = jwt.sign({
        admin: user.admin,
        username: user.username,
    },
        process.env.AUTH_SECRET,
        {
            expiresIn: '15m'
        }
    )
    return token
}

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        if (!authHeader || typeof authHeader !== 'string') {
            res.status(401).json({ success: false, message: 'Authorization header missing' });
            return
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.AUTH_SECRET);
        (req as any).user = decoded;
        next()
    } catch (err) {
        res.status(403).json({ success: false, message: 'Invalid or expired token', err })
        return
    }
}