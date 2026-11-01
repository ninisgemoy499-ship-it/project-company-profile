import { prisma } from '../database/prisma.js'

function serializeMessage(message) {
  return {
    ...message,
    id: message.id.toString(),
    createdAt: message.createdAt.toISOString(),
  }
}

export const contactMessageRepository = {
  async findMany() {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return messages.map(serializeMessage)
  },

  async findById(id) {
    const message = await prisma.contactMessage.findUnique({ where: { id } })
    return message ? serializeMessage(message) : null
  },

  async create(data) {
    return serializeMessage(await prisma.contactMessage.create({ data }))
  },

  async update(id, data) {
    return serializeMessage(await prisma.contactMessage.update({ where: { id }, data }))
  },

  async delete(id) {
    return serializeMessage(await prisma.contactMessage.delete({ where: { id } }))
  },
}