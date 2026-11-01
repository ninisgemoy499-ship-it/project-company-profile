import { prisma } from '../database/prisma.js'

function serialize(record) {
  if (!record) return record
  return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, typeof value === 'bigint' ? value.toString() : value]))
}

function serializeMany(records) {
  return records.map(serialize)
}

export const adminRepository = {
  async getDashboard() {
    const [projects, posts, messages, contactMessages] = await prisma.$transaction([
      prisma.portfolioProject.count(),
      prisma.blogPost.count({ where: { status: 'published' } }),
      prisma.contactMessage.count({ where: { status: 'unread' } }),
      prisma.contactMessage.count(),
    ])
    return { projects, posts, unreadMessages: messages, contactMessages }
  },
  async listServices() { return serializeMany(await prisma.service.findMany({ orderBy: { sortOrder: 'asc' } })) },
  async createService(data) { return serialize(await prisma.service.create({ data })) },
  async updateService(id, data) { return serialize(await prisma.service.update({ where: { id }, data })) },
  async deleteService(id) { return serialize(await prisma.service.delete({ where: { id } })) },

  async listProjects() { return serializeMany(await prisma.portfolioProject.findMany({ orderBy: { updatedAt: 'desc' } })) },
  async createProject(data) { return serialize(await prisma.portfolioProject.create({ data })) },
  async updateProject(id, data) { return serialize(await prisma.portfolioProject.update({ where: { id }, data })) },
  async deleteProject(id) { return serialize(await prisma.portfolioProject.delete({ where: { id } })) },

  async listPosts() { return serializeMany(await prisma.blogPost.findMany({ include: { author: { select: { id: true, name: true, email: true } } }, orderBy: { updatedAt: 'desc' } })) },
  async createPost(data) { return serialize(await prisma.blogPost.create({ data })) },
  async updatePost(id, data) { return serialize(await prisma.blogPost.update({ where: { id }, data })) },
  async deletePost(id) { return serialize(await prisma.blogPost.delete({ where: { id } })) },

  async listPages() { return serializeMany(await prisma.page.findMany({ orderBy: { updatedAt: 'desc' } })) },
  async createPage(data) { return serialize(await prisma.page.create({ data })) },
  async updatePage(id, data) { return serialize(await prisma.page.update({ where: { id }, data })) },
  async deletePage(id) { return serialize(await prisma.page.delete({ where: { id } })) },

  async listMedia() { return serializeMany(await prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' } })) },
  async createMedia(data) { return serialize(await prisma.mediaAsset.create({ data })) },
  async deleteMedia(id) { return serialize(await prisma.mediaAsset.delete({ where: { id } })) },

  async listSettings() { return serializeMany(await prisma.siteSetting.findMany({ orderBy: { key: 'asc' } })) },
  async upsertSetting(key, value) { return serialize(await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } })) },
  async deleteSetting(id) { return serialize(await prisma.siteSetting.delete({ where: { id } })) },

  async listUsers() { return serializeMany(await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true }, orderBy: { createdAt: 'desc' } })) },
  async updateUser(id, data) { return serialize(await prisma.user.update({ where: { id }, data, select: { id: true, name: true, email: true, role: true, updatedAt: true } })) },
  async deleteUser(id) { return serialize(await prisma.user.delete({ where: { id } })) },
}