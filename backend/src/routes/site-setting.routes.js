import { Router } from 'express'
import { deleteSiteSetting, listSiteSettings, upsertSiteSetting } from '../controllers/site-setting.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)
router.get('/', listSiteSettings)
router.put('/', upsertSiteSetting)
router.delete('/:id', deleteSiteSetting)

export default router