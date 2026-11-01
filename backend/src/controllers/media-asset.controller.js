import { mediaAssetService } from '../services/media-asset.service.js'

export async function listMediaAssets(_request, response, next) { try { response.json({ success: true, data: await mediaAssetService.list() }) } catch (error) { next(error) } }
export async function createMediaAsset(request, response, next) { try { response.status(201).json({ success: true, data: await mediaAssetService.create(request.body) }) } catch (error) { next(error) } }
export async function deleteMediaAsset(request, response, next) { try { response.json({ success: true, data: await mediaAssetService.remove(request.params.id) }) } catch (error) { next(error) } }