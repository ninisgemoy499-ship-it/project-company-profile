import { prisma } from '../database/prisma.js'

export const companyRepository = {
  async findProfile() {
    return prisma.companyProfile.findFirst({
      select: { id: true, name: true, descriptor: true, headline: true, intro: true, email: true, location: true },
    })
  },
}
