import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { adminRepository } from '../repositories/admin.repository.js'

const id = z.coerce.bigint().positive()
const serviceInput = z.object({ title: z.string().trim().min(1).max(160), description: z.string().trim().min(1), sortOrder: z.coerce.number().int().min(0).optional(), isPublished: z.boolean().optional() })
const projectInput = z.object({ title: z.string().trim().min(1).max(160), client: z.string().trim().min(1).max(160), description: z.string().optional().nullable(), category: z.string().trim().min(1).max(120), imageUrl: z.string().url().optional().nullable(), status: z.enum(['draft', 'review', 'published']).optional() })
const postInput = z.object({ title: z.string().trim().min(1).max(220), slug: z.string().trim().min(1).max(240), excerpt: z.string().optional().nullable(), content: z.string().min(1), status: z.enum(['draft', 'published']).optional(), authorId: z.coerce.bigint().positive() })
const pageInput = z.object({ title: z.string().trim().min(1).max(180), slug: z.string().trim().min(1).max(200), content: z.string().min(1), status: z.enum(['draft', 'published']).optional() })
const mediaInput = z.object({ name: z.string().trim().min(1).max(180), url: z.string().url().max(500), mimeType: z.string().trim().min(1).max(120), sizeBytes: z.coerce.number().int().min(0).optional() })
const settingInput = z.object({ key: z.string().trim().min(1).max(120), value: z.string() })

function parseId(value) { const result = id.safeParse(value); if (!result.success) { const error = new Error('Invalid id'); error.statusCode = 400; throw error } return result.data }
function parse(schema, input) { const result = schema.safeParse(input); if (!result.success) { const error = new Error(result.error.issues[0]?.message || 'Invalid input'); error.statusCode = 400; throw error } return result.data }

export const adminService = {
  getDashboard: () => adminRepository.getDashboard(),
  listServices: () => adminRepository.listServices(), createService: (input) => adminRepository.createService(parse(serviceInput, input)), updateService: (idValue, input) => adminRepository.updateService(parseId(idValue), parse(serviceInput.partial(), input)), deleteService: (idValue) => adminRepository.deleteService(parseId(idValue)),
  listProjects: () => adminRepository.listProjects(), createProject: (input) => adminRepository.createProject(parse(projectInput, input)), updateProject: (idValue, input) => adminRepository.updateProject(parseId(idValue), parse(projectInput.partial(), input)), deleteProject: (idValue) => adminRepository.deleteProject(parseId(idValue)),
  listPosts: () => adminRepository.listPosts(), createPost: (input) => adminRepository.createPost(parse(postInput, input)), updatePost: (idValue, input) => adminRepository.updatePost(parseId(idValue), parse(postInput.partial(), input)), deletePost: (idValue) => adminRepository.deletePost(parseId(idValue)),
  listPages: () => adminRepository.listPages(), createPage: (input) => adminRepository.createPage(parse(pageInput, input)), updatePage: (idValue, input) => adminRepository.updatePage(parseId(idValue), parse(pageInput.partial(), input)), deletePage: (idValue) => adminRepository.deletePage(parseId(idValue)),
  listMedia: () => adminRepository.listMedia(), createMedia: (input) => adminRepository.createMedia(parse(mediaInput, input)), deleteMedia: (idValue) => adminRepository.deleteMedia(parseId(idValue)),
  listSettings: () => adminRepository.listSettings(), upsertSetting: (input) => { const data = parse(settingInput, input); return adminRepository.upsertSetting(data.key, data.value) }, deleteSetting: (idValue) => adminRepository.deleteSetting(parseId(idValue)),
  listUsers: () => adminRepository.listUsers(), updateUser: async (idValue, input) => { const data = parse(z.object({ name: z.string().trim().min(1).max(120).optional(), role: z.enum(['admin', 'editor']).optional(), password: z.string().min(8).optional() }).refine((value) => Object.keys(value).length > 0), input); if (data.password) data.passwordHash = await bcrypt.hash(data.password, 12); delete data.password; return adminRepository.updateUser(parseId(idValue), data) }, deleteUser: (idValue) => adminRepository.deleteUser(parseId(idValue)),
}