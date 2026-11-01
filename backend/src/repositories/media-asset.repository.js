import { prisma } from '../database/prisma.js'

function serialize(asset) {
  return { ...asset, id: asset.id.toString() }
}

export const mediaAssetRepository = {
  async findMany() {
    const assets = await prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' } })
    return assets.map(serialize)
  },
  async findById(id) {
    const asset = await prisma.mediaAsset.findUnique({ where: { id } })
    return asset ? serialize(asset) : null
  },
  async create(data) { return serialize(await prisma.mediaAsset.create({ data })) },
  async delete(id) { return serialize(await prisma.mediaAsset.delete({ where: { id } })) },
}