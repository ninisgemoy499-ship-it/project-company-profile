import { prisma } from '../database/prisma.js'

function serialize(setting) {
  return { ...setting, id: setting.id.toString() }
}

export const siteSettingRepository = {
  async findMany() {
    const settings = await prisma.siteSetting.findMany({ orderBy: { key: 'asc' } })
    return settings.map(serialize)
  },
  async findById(id) {
    const setting = await prisma.siteSetting.findUnique({ where: { id } })
    return setting ? serialize(setting) : null
  },
  async upsert(key, value) {
    return serialize(await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } }))
  },
  async delete(id) {
    return serialize(await prisma.siteSetting.delete({ where: { id } }))
  },
}