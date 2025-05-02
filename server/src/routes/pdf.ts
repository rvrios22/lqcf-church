import fs from 'fs'
import express from "express"
const router = express.Router()
import db from "../models"
const { PDF, Study } = db
import { pdfUpload } from '../middleware/multer'

router.get('/', async (req, res, next) => {
    try {
        const pdfs = await PDF.findAll()
        res.status(200).json(pdfs)
    } catch (err) {
        next(err)
    }
})

router.get('/:studyName', async (req, res, next) => {
    const studyName = req.params.studyName
    if (!studyName) {
        res.status(400).json({ message: 'Params missing' })
        return
    }
    try {
        const study = await Study.findOne({ where: { name: studyName } })
        if (!study) {
            res.status(404).json({ message: 'The study does not exist' })
            return
        }
        const pdfs = await PDF.findAll({
            where: {
                studyId: study.id
            }
        })
        res.status(200).json(pdfs)
    } catch (err) {
        next(err)
    }
})

router.post('/', pdfUpload.single('pdf'), async (req, res, next) => {
    if (!req.file) {
        res.status(400).json({ message: 'File not uploaded, please attach a PDF to upload' })
        return
    }
    if (req.file.mimetype !== 'application/pdf') {
        res.status(415).json({ message: 'Please select a PDF to upload' })
        return
    }
    const { title, studyName, date } = req.body
    const file = req.file
    const dateCheck = date === 'null' || date === '' ? null : date
    try {
        let study = await Study.findOne({ where: { name: studyName } })
        if (!study) {
            study = await Study.create({ name: studyName })
        }
        const pdf = await PDF.create({
            title: title,
            pdfPath: file.path,
            studyId: study.id,
            date: dateCheck
        })
        res.status(201).json(pdf)
    } catch (err) {
        fs.unlink(file.path, (err) => {
            if (err) {
                res.status(500).json({ message: err.message })
            }
            console.log(`file at ${file.path} was deleted`)
        })
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    const pdfId = req.params.id
    const { title, date, studyName } = req.body
    try {
        let study = await Study.findOne({ where: { name: studyName } })
        if (!study) {
            study = await Study.create({ name: studyName })
        }
        const pdf = await PDF.findOne({ where: { id: pdfId } })
        if (!pdf) {
            res.status(404).json({ message: 'The PDF was not found' })
            return
        }
        await pdf.update({
            title: title,
            date: date,
            studyId: study.id
        })
        res.status(200).json(pdf)
    } catch (err) {
        next(err)
    }

})

router.delete('/:id', async (req, res, next) => {
    const pdfId = req.params.id
    try {
        const pdf = await PDF.findOne({ where: { id: pdfId } })
        if (!pdf) {
            res.status(404).json({ message: 'The PDF was not found' })
            return
        }
        fs.unlink(pdf.pdfPath, (err) => {
            if (err) {
                res.status(500).json({ message: 'Something went wrong', err })
                next(err)
                return
            }
        })
        await pdf.destroy()
        res.status(200).json({ message: 'PDF was deleted' })
    } catch (err) {
        next(err)
    }
})

export default router