import { z } from 'zod'
import { contactMessageRepository } from '../repositories/contact-message.repository.js'

const idSchema = z.coerce.bigint().positive()
const createSchema = z.object({
  name: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(190),
  company: z.string().trim().max(160).optional().nullable(),
  message: z.string().trim().min(1),
})
const updateSchema = z.object({
  name: z.string().trim().min(1).max(160).optional(),
  email: z.string().trim().email().max(190).optional(),
  company: z.string().trim().max(160).optional().nullable(),
  message: z.string().trim().min(1).optional(),
  status: z.enum(['unread', 'read', 'archived']).optional(),
}).refine((value) => Object.keys(value).length > 0, 'At least one field is required')

function validationError(message) {
  const error = new Error(message)
  error.statusCode = 400
  return error
}

function parseId(value) {
  const result = idSchema.safeParse(value)
  if (!result.success) throw validationError('Invalid contact message id')
  return result.data
}

export const contactMessageService = {
  async list() {
    return contactMessageRepository.findMany()
  },

  async get(id) {
    const message = await contactMessageRepository.findById(parseId(id))
    if (!message) {
      const error = new Error('Contact message not found')
      error.statusCode = 404
      throw error
    }
    return message
  },

  async create(input) {
    const parsed = createSchema.safeParse(input)
    if (!parsed.success) throw validationError(parsed.error.issues[0]?.message || 'Invalid contact message')
    return contactMessageRepository.create({
      ...parsed.data,
      company: parsed.data.company || null,
    })
  },

  async update(id, input) {
    const parsed = updateSchema.safeParse(input)
    if (!parsed.success) throw validationError(parsed.error.issues[0]?.message || 'Invalid contact message')
    await this.get(id)
    return contactMessageRepository.update(parseId(id), parsed.data)
  },

  async remove(id) {
    await this.get(id)
    return contactMessageRepository.delete(parseId(id))
  },
}