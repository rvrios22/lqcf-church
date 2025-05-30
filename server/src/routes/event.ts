import express from "express"
const router = express.Router()
import db from "../models/index"
import { verifyUser } from "../middleware/auth"
const { MonthEvent } = db

router.get('/', async (req, res, next) => {
    try {
        const events = await MonthEvent.findAll({ order: [['date', 'ASC']] })
        res.status(200).json(events)
    } catch (err) {
        res.status(500).json({ err })
        next(err)
    }
})

router.post('/', verifyUser, async (req, res, next) => {
    const { title, description, date } = req.body
    try {
        const event = await MonthEvent.create({
            title: title,
            description: description,
            date: date
        })
        res.status(201).json(event)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', verifyUser, async (req, res, next) => {
    const id = req.params.id
    const { title, description, date } = req.body
    try {
        const event = await MonthEvent.findByPk(id)
        if (!event) {
            res.status(404).json({ message: "The event does not exist" })
            return
        }
        await event.update({
            title: title,
            description: description,
            date: date
        })
        res.status(200).json(event)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', verifyUser, async (req, res, next) => {
    const id = req.params.id
    try {
        const event = await MonthEvent.findByPk(id)
        if (!event) {
            res.status(404).json({ message: 'The event cannot be found' })
            return
        }
        await event.destroy()
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

export default router