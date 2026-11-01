import { siteSettingService } from '../services/site-setting.service.js'

export async function listSiteSettings(_request, response, next) { try { response.json({ success: true, data: await siteSettingService.list() }) } catch (error) { next(error) } }
export async function upsertSiteSetting(request, response, next) { try { response.json({ success: true, data: await siteSettingService.upsert(request.body) }) } catch (error) { next(error) } }
export async function deleteSiteSetting(request, response, next) { try { response.json({ success: true, data: await siteSettingService.remove(request.params.id) }) } catch (error) { next(error) } }