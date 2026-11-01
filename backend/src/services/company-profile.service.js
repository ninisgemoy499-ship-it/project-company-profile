import { z } from 'zod'
import { companyProfileRepository } from '../repositories/company-profile.repository.js'

const profileSchema = z.object({
	name: z.string().trim().min(1).max(120),
	descriptor: z.string().trim().min(1).max(180),
	headline: z.string().trim().min(1).max(255),
	intro: z.string().trim().min(1),
	email: z.string().trim().email().max(190),
	location: z.string().trim().min(1).max(190),
})

export const companyProfileService = {
	async get() {
		return companyProfileRepository.find()
	},
	async update(input) {
		const parsed = profileSchema.safeParse(input)
		if (!parsed.success) {
			const error = new Error(parsed.error.issues[0]?.message || 'Invalid company profile')
			error.statusCode = 400
			throw error
		}
		const profile = await companyProfileRepository.find()
		if (!profile) {
			const error = new Error('Company profile not found')
			error.statusCode = 404
			throw error
		}
		return companyProfileRepository.update(BigInt(profile.id), parsed.data)
	},
}
