import { prisma } from '../database/prisma.js'

function serialize(value) {
	if (typeof value === 'bigint') return value.toString()
	if (Array.isArray(value)) return value.map(serialize)
	if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, serialize(item)]))
	return value
}

const authorSelect = { id: true, name: true, email: true }

export const blogPostRepository = {
	async findMany() {
		return serialize(await prisma.blogPost.findMany({ include: { author: { select: authorSelect } }, orderBy: { updatedAt: 'desc' } }))
	},
	async findPublished() {
		return serialize(await prisma.blogPost.findMany({ where: { status: 'published' }, include: { author: { select: authorSelect } }, orderBy: { publishedAt: 'desc' } }))
	},
	async findById(id) {
		return serialize(await prisma.blogPost.findUnique({ where: { id }, include: { author: { select: authorSelect } } }))
	},
	async findBySlug(slug) {
		return serialize(await prisma.blogPost.findUnique({ where: { slug }, include: { author: { select: authorSelect } } }))
	},
	async create(data) { return serialize(await prisma.blogPost.create({ data, include: { author: { select: authorSelect } } })) },
	async update(id, data) { return serialize(await prisma.blogPost.update({ where: { id }, data, include: { author: { select: authorSelect } } })) },
	async delete(id) { return serialize(await prisma.blogPost.delete({ where: { id }, include: { author: { select: authorSelect } } })) },
}
