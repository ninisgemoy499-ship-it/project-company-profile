import { z } from 'zod'
import { blogPostRepository } from '../repositories/blog-post.repository.js'

const idSchema = z.coerce.bigint().positive()
const createSchema = z.object({
	title: z.string().trim().min(1).max(220),
	slug: z.string().trim().min(1).max(240).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
	excerpt: z.string().trim().max(1000).optional().nullable(),
	content: z.string().min(1),
	status: z.enum(['draft', 'published']).default('draft'),
	authorId: z.coerce.bigint().positive(),
})
const updateSchema = createSchema.partial().omit({ authorId: true }).refine((value) => Object.keys(value).length > 0, 'At least one field is required')

function error(message, statusCode = 400) { const result = new Error(message); result.statusCode = statusCode; return result }
function parseId(value) { const result = idSchema.safeParse(value); if (!result.success) throw error('Invalid blog post id'); return result.data }
function withPublishedAt(data) { return data.status === 'published' ? { ...data, publishedAt: new Date() } : data }

export const blogPostService = {
	async list() { return blogPostRepository.findMany() },
	async listPublished() { return blogPostRepository.findPublished() },
	async get(id) { const post = await blogPostRepository.findById(parseId(id)); if (!post) throw error('Blog post not found', 404); return post },
	async getBySlug(slug) { const post = await blogPostRepository.findBySlug(slug); if (!post) throw error('Blog post not found', 404); return post },
	async create(input) { const result = createSchema.safeParse(input); if (!result.success) throw error(result.error.issues[0]?.message || 'Invalid blog post'); return blogPostRepository.create(withPublishedAt(result.data)) },
	async update(id, input) { const result = updateSchema.safeParse(input); if (!result.success) throw error(result.error.issues[0]?.message || 'Invalid blog post'); await this.get(id); return blogPostRepository.update(parseId(id), withPublishedAt(result.data)) },
	async remove(id) { await this.get(id); return blogPostRepository.delete(parseId(id)) },
}
