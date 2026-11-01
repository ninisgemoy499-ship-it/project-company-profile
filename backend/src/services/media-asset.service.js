import { z } from 'zod'
import { mediaAssetRepository } from '../repositories/media-asset.repository.js'

const idSchema = z.coerce.bigint().positive()
const createSchema = z.object({
  name: z.string().trim().min(1).max(180),
  url: z.string().url().max(500),
  mimeType: z.string().trim().min(1).max(120),
  sizeBytes: z.coerce.number().int().min(0).optional(),
})

function invalid(message, statusCode = 400) { const error = new Error(message); error.statusCode = statusCode; return error }
function parseId(value) { const result = idSchema.safeParse(value); if (!result.success) throw invalid('Invalid media asset id'); return result.data }

export const mediaAssetService = {
  list() { return mediaAssetRepository.findMany() },
  async create(input) {
    const parsed = createSchema.safeParse(input)
    if (!parsed.success) throw invalid(parsed.error.issues[0]?.message || 'Invalid media asset')
    return mediaAssetRepository.create(parsed.data)
  },
  async remove(id) {
    const parsedId = parseId(id)
    if (!await mediaAssetRepository.findById(parsedId)) throw invalid('Media asset not found', 404)
    return mediaAssetRepository.delete(parsedId)
  },
}