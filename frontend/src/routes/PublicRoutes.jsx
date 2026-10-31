import { PublicLayout } from '../layouts/PublicLayout'
import { HomePage } from '../pages/public/Home/HomePage'
import { companyApi } from '../services/api'

export function PublicRoutes() {
  const data = companyApi.getHomePageData()
  return <PublicLayout company={data.company}><HomePage {...data} /></PublicLayout>
}