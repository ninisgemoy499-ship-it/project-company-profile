import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  const passwordHash = await bcrypt.hash('northstar123', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@northstar.studio' },
    update: { name: 'Alya Pratama', passwordHash, role: 'admin' },
    create: { name: 'Alya Pratama', email: 'admin@northstar.studio', passwordHash, role: 'admin' },
  })

  await prisma.companyProfile.upsert({
    where: { id: 1n },
    update: {},
    create: {
      name: 'Northstar',
      descriptor: 'Brand & digital studio',
      headline: 'Make your next move impossible to ignore.',
      intro: 'We build distinct brands and digital experiences for ambitious teams ready to change the conversation.',
      email: 'hello@northstar.studio',
      location: 'Jakarta · Singapore · Everywhere',
    },
  })

  await prisma.service.createMany({
    data: [
      { title: 'Brand strategy', description: 'Positioning, identity systems, and a point of view that makes your brand memorable.', sortOrder: 1 },
      { title: 'Digital experiences', description: 'Websites and products that feel as good to use as they look.', sortOrder: 2 },
      { title: 'Creative direction', description: 'Campaigns, content, and visual worlds that turn ideas into signals.', sortOrder: 3 },
    ],
    skipDuplicates: true,
  })

  console.log(`Seeded admin user ${admin.email}`)
}

seed().catch((error) => {
  console.error('Database seed failed:', error)
  process.exitCode = 1
}).finally(async () => {
  await prisma.$disconnect()
})