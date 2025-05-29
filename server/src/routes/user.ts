import express from "express"
import { Request, Response, NextFunction } from "express"
const router = express.Router()
import { hashPassword, comparePasswords, assignJWTToken, verifyUser } from '../middleware/auth'
import db from '../models/index'
const { User } = db


router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', err })
        return
    }
})

//route to verify users
router.get('/verify', verifyUser, (req: Request, res: Response, next: NextFunction): void => {
    res.status(200).json((req as any).user)
})

//register user commented out for security
// router.post('/sign-up', async (req, res, next) => {
//     const { username, password } = req.body
//     try {
//         const user = await User.create({
//             username: username,
//             password: await hashPassword(password)
//         })
//         res.status(200).json(user)
//     } catch (err) {
//         console.error(err)
//         next(err)
//         return
//     }
// })

//log user in and assign jwt
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ where: { username: username } })
        if (!user) {
            res.status(404).json({ message: 'We could not find a user with that username' })
            return
        }
        const arePasswordsMatch = await comparePasswords(password, user.password)
        if (!arePasswordsMatch) {
            res.status(401).json({ message: 'The password entered is incorrect' })
            return
        }
        const token = assignJWTToken(user)

        res.status(200).json(token)
    } catch (err) {
        console.error(err)
        next(err)
        return
    }
})

module.exports = router