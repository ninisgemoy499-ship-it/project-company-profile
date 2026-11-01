import { Router } from 'express'
import { create, dashboard, list, remove, update } from '../controllers/admin.controller.js'
import { getCompanyProfile, updateCompanyProfile } from '../controllers/company-profile.controller.js'
import blogPostRouter from './blog-post.routes.js'
import contactMessageRouter from './contact-message.routes.js'
import mediaAssetRouter from './media-asset.routes.js'
import siteSettingRouter from './site-setting.routes.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

router.get('/dashboard', dashboard)
router.get('/profile', getCompanyProfile)
router.patch('/profile', updateCompanyProfile)
router.use('/messages', contactMessageRouter)
router.use('/posts', blogPostRouter)

for (const resource of ['services', 'projects', 'pages']) {
  router.get(`/${resource}`, list(resource))
  router.post(`/${resource}`, create(resource))
  router.patch(`/${resource}/:id`, update(resource))
  router.delete(`/${resource}/:id`, remove(resource))
}

router.use('/media', mediaAssetRouter)
router.use('/settings', siteSettingRouter)
router.get('/users', list('users'))
router.patch('/users/:id', update('users'))
router.delete('/users/:id', remove('users'))

export default router
