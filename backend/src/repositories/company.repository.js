import { prisma } from '../database/prisma.js'

function serializeProfile(profile) {
  if (!profile) return null
  return { ...profile, id: profile.id.toString() }
}

export const companyRepository = {
  async findProfile() {
    const profile = await prisma.companyProfile.findFirst({
      select: { id: true, name: true, descriptor: true, headline: true, intro: true, email: true, location: true },
    })
    return serializeProfile(profile)
  },
}
