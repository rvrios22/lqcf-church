import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import db from './models/index';
import pdf from './routes/pdf'
import study from './routes/study'
import event from './routes/event'
import user from './routes/user'
import HttpError from './types/HttpError';
dotenv.config();
const app = express();
const port = 3001;

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use('/api/static/', express.static(path.join(__dirname, '..', 'public')))

app.use('/api/pdf', pdf)
app.use('/api/study', study)
app.use('/api/event', event)
app.use('/api/user', user)

db.sequelize.sync({
    alert: true,
    // force: true
}).then(() => {
    console.log('db synced')
})


app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    if (res.headersSent) {
        return next(err)
    }
    if (err instanceof Error) {
        const status = (err as HttpError).status || 500
        res.status(status).json({ message: err.message })
    } else {
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})