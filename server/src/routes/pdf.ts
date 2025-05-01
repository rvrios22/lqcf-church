import fs from 'fs'
import express from "express"
const router = express.Router()
import db from "../models"
const { PDF, Study } = db

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
        res.status(400).json({ success: false, message: 'Params missing' })
        return
    }
    try {
        const study = await Study.findOne({ where: { name: studyName } })
        if (!study) {
            res.status(404).json({ success: false, message: 'The study does not exist' })
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

router.post('/', pdfsUpload.single('pdf'), async (req, res, next) => {
    if (!req.file) {
        res.status(400).json({ success: false, message: 'File not uploaded, please attach a PDF to upload' })
        return
    }
    if (req.file.mimetype !== 'application/pdf') {
        res.status(415).json({ success: false, message: 'Please select a PDF to upload' })
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
        res.status(201).json({ success: true, pdf })
    } catch (err) {
        fs.unlink(file.path, (err) => {
            if (err) {
                res.status(500).json({ success: false, message: err.message })
            }
            console.log(`file at ${file.path} was deleted`)
        })
        res.json({ success: false, message: err.message })
        next(err)
    }
})


export default router