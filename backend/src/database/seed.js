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
    update: { headline: 'solusi kenyaman berkendara secara eksklusif? Di rental Yahoo aja' },
    create: {
      name: 'Northstar',
      descriptor: 'Brand & digital studio',
      headline: 'solusi kenyaman berkendara secara eksklusif? Di rental Yahoo aja',
      intro: 'Nikmati pengalaman berkendara yang nyaman, aman, dan terpercaya bersama layanan rental mobil kami. We provide premium-quality vehicles with professional service to make every journey more comfortable, exclusive, and memorable. Your comfort is our priority!',
      email: 'hello@northstar.studio',
      location: 'Jakarta · Singapore · Everywhere',
    },
  })

  if (await prisma.service.count() === 0) {
    await prisma.service.createMany({
      data: [
        { title: 'Brand strategy', description: 'Positioning, identity systems, and a point of view that makes your brand memorable.', sortOrder: 1 },
        { title: 'Digital experiences', description: 'Websites and products that feel as good to use as they look.', sortOrder: 2 },
        { title: 'Creative direction', description: 'Campaigns, content, and visual worlds that turn ideas into signals.', sortOrder: 3 },
      ],
    })
  }

  if (await prisma.page.count() === 0) {
    await prisma.page.createMany({
      data: [
        { title: 'Home', slug: 'home', content: 'Northstar company profile home page.', status: 'published' },
        { title: 'About', slug: 'about', content: 'About Northstar.', status: 'published' },
      ],
    })
  }

  if (await prisma.portfolioProject.count() === 0) {
    await prisma.portfolioProject.createMany({
      data: [
        { title: 'Form / Function', client: 'Morrow Objects', category: 'Brand identity · Digital', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85', status: 'published' },
        { title: 'Aster House', client: 'Aster Hospitality', category: 'Strategy · Experience', imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85', status: 'review' },
      ],
    })
  }

  if (await prisma.blogPost.count() === 0) {
    await prisma.blogPost.create({
      data: {
        title: 'The case for a little more weird',
        slug: 'the-case-for-a-little-more-weird',
        excerpt: 'Why distinctive brands are built by choosing a point of view.',
        content: 'A practical note on making work that earns a second look.',
        status: 'published',
        publishedAt: new Date(),
        authorId: admin.id,
      },
    })
  }

  if (await prisma.contactMessage.count() === 0) {
    await prisma.contactMessage.create({
      data: {
        name: 'Raka Wijaya',
        email: 'raka@example.com',
        company: 'Morrow Objects',
        message: 'We would love to explore a new digital experience with Northstar.',
        status: 'unread',
      },
    })
  }

  if (await prisma.mediaAsset.count() === 0) {
    await prisma.mediaAsset.create({
      data: {
        name: 'Northstar studio cover',
        url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85',
        mimeType: 'image/jpeg',
        sizeBytes: 0,
      },
    })
  }

  if (await prisma.siteSetting.count() === 0) {
    await prisma.siteSetting.createMany({
      data: [
        { key: 'site.title', value: 'Northstar — Brand & digital studio' },
        { key: 'site.locale', value: 'id-ID' },
        { key: 'contact.email', value: 'hello@northstar.studio' },
      ],
    })
  }

  console.log(`Seeded admin user ${admin.email}`)
}

seed().catch((error) => {
  console.error('Database seed failed:', error)
  process.exitCode = 1
}).finally(async () => {
  await prisma.$disconnect()
})