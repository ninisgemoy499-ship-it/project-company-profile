import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

router.get('/dashboard', (_request, response) => {
  response.json({ success: true, data: { message: 'Admin dashboard endpoint ready' } })
})

export default router
