import { z } from 'zod'
import { siteSettingRepository } from '../repositories/site-setting.repository.js'

const idSchema = z.coerce.bigint().positive()
const settingSchema = z.object({
  key: z.string().trim().min(1).max(120).regex(/^[a-z0-9._-]+$/),
  value: z.string().max(10000),
})

function invalid(message, statusCode = 400) { const error = new Error(message); error.statusCode = statusCode; return error }
function parseId(value) { const result = idSchema.safeParse(value); if (!result.success) throw invalid('Invalid site setting id'); return result.data }

export const siteSettingService = {
  list() { return siteSettingRepository.findMany() },
  async upsert(input) {
    const parsed = settingSchema.safeParse(input)
    if (!parsed.success) throw invalid(parsed.error.issues[0]?.message || 'Invalid site setting')
    return siteSettingRepository.upsert(parsed.data.key, parsed.data.value)
  },
  async remove(id) {
    const parsedId = parseId(id)
    if (!await siteSettingRepository.findById(parsedId)) throw invalid('Site setting not found', 404)
    return siteSettingRepository.delete(parsedId)
  },
}