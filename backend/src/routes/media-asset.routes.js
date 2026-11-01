import { Router } from 'express'
import { createMediaAsset, deleteMediaAsset, listMediaAssets } from '../controllers/media-asset.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)
router.get('/', listMediaAssets)
router.post('/', createMediaAsset)
router.delete('/:id', deleteMediaAsset)

export default router