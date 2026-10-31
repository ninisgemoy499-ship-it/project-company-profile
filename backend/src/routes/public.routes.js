import { Router } from 'express'
import { getCompanyProfile } from '../controllers/public.controller.js'

const router = Router()
router.get('/profile', getCompanyProfile)

export default router
