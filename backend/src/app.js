import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import { env } from './config/env.js'
import { errorHandler } from './middleware/errorHandler.js'
import { notFound } from './middleware/notFound.js'
import apiRouter from './routes/index.js'

const app = express()

app.use(helmet())
app.use(cors({ origin: env.CLIENT_URL, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 200 }))

app.get('/health', (_request, response) => {
  response.json({ status: 'ok', service: 'northstar-company-profile-api' })
})
app.use('/api/v1', apiRouter)
app.use(notFound)
app.use(errorHandler)

export default app
