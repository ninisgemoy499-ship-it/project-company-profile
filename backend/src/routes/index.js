import { Router } from 'express'
import adminRouter from './admin.routes.js'
import authRouter from './auth.routes.js'
import contactMessageRouter from './contact-message.routes.js'
import publicRouter from './public.routes.js'

const router = Router()
router.use('/auth', authRouter)
router.use('/contact-messages', contactMessageRouter)
router.use('/public', publicRouter)
router.use('/admin', adminRouter)

export default router
