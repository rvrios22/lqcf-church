import express from "express"
const router = express.Router()
import db from "../models/index"
const { Study } = db

router.get('/', async (req, res, next) => {
    try {
        const studies = await Study.findAll()
        res.status(200).json({ studies })
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    const { name } = req.body
    try {
        await Study.create({ name: name })
        res.status(200).json({ message: `${name} study created` })
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    const id = req.params.id
    const { name } = req.body
    try {
        const study = await Study.findByPk(id)
        if (!study) {
            res.status(404).json({ message: "study does not exist" })
            return
        }
        await study.update({ name: name })
        res.status(200).json(study)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const study = await Study.findByPk(id)
        if (!study) {
            res.status(404).json({ message: "study does not exist" })
            return
        }
        await study.destroy()
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

export default router