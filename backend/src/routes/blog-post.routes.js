import { Router } from 'express'
import { createBlogPost, deleteBlogPost, getBlogPost, listBlogPosts, updateBlogPost } from '../controllers/blog-post.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)
router.get('/', listBlogPosts)
router.get('/:id', getBlogPost)
router.post('/', createBlogPost)
router.patch('/:id', updateBlogPost)
router.delete('/:id', deleteBlogPost)

export default router