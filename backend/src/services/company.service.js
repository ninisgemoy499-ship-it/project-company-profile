import { companyRepository } from '../repositories/company.repository.js'

export const companyService = {
  async getProfile() {
    return companyRepository.findProfile()
  },
}
