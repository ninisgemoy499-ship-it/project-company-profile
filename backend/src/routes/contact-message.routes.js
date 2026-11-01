import { Router } from 'express'
import {
  deleteContactMessage,
  getContactMessage,
  listContactMessages,
  updateContactMessage,
} from '../controllers/contact-message.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth)
router.get('/', listContactMessages)
router.get('/:id', getContactMessage)
router.patch('/:id', updateContactMessage)
router.delete('/:id', deleteContactMessage)

export default router