import { prisma } from '../database/prisma.js'

export const userRepository = {
  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, passwordHash: true, role: true },
    })
  },
}
