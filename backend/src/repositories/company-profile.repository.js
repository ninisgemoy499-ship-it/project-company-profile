import { prisma } from '../database/prisma.js'

function serializeProfile(profile) {
	if (!profile) return null
	return { ...profile, id: profile.id.toString() }
}

export const companyProfileRepository = {
	async find() {
		return serializeProfile(await prisma.companyProfile.findFirst())
	},
	async update(id, data) {
		return serializeProfile(await prisma.companyProfile.update({ where: { id }, data }))
	},
}
