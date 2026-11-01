import { Router } from 'express'
import { createContactMessage } from '../controllers/contact-message.controller.js'
import { getBlogPostBySlug, listPublishedBlogPosts } from '../controllers/blog-post.controller.js'
import { getCompanyProfile } from '../controllers/public.controller.js'

const router = Router()
router.get('/profile', getCompanyProfile)
router.post('/contact-messages', createContactMessage)
router.get('/blog-posts', listPublishedBlogPosts)
router.get('/blog-posts/:slug', getBlogPostBySlug)

export default router
