import { company, stats, testimonial } from '../features/company/mockData'
import { projects } from '../features/portfolio/mockData'
import { services } from '../features/services/mockData'

export const companyApi = {
  getHomePageData() {
    return { company, projects, services, stats, testimonial }
  },
}