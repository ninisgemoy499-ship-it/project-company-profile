import { companyProfileService } from '../services/company-profile.service.js'

export async function getCompanyProfile(_request, response, next) {
	try {
		response.json({ success: true, data: await companyProfileService.get() })
	} catch (error) {
		next(error)
	}
}

export async function updateCompanyProfile(request, response, next) {
	try {
		response.json({ success: true, data: await companyProfileService.update(request.body) })
	} catch (error) {
		next(error)
	}
}
