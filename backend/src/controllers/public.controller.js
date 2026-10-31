import { companyService } from '../services/company.service.js'

export async function getCompanyProfile(_request, response, next) {
  try {
    const profile = await companyService.getProfile()
    response.json({ success: true, data: profile })
  } catch (error) {
    next(error)
  }
}
