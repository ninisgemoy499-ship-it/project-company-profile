import { adminService } from '../services/admin.service.js'

const actions = {
  services: ['listServices', 'createService', 'updateService', 'deleteService'], projects: ['listProjects', 'createProject', 'updateProject', 'deleteProject'], posts: ['listPosts', 'createPost', 'updatePost', 'deletePost'], pages: ['listPages', 'createPage', 'updatePage', 'deletePage'], media: ['listMedia', 'createMedia', null, 'deleteMedia'], settings: ['listSettings', 'upsertSetting', null, 'deleteSetting'], users: ['listUsers', null, 'updateUser', 'deleteUser'],
}

export function dashboard(_request, response, next) {
  adminService.getDashboard().then((data) => response.json({ success: true, data })).catch(next)
}

function run(method, action, request, response, next) { Promise.resolve(adminService[method](...(action === 'list' ? [] : action === 'create' || action === 'upsert' ? [request.body] : [request.params.id, request.body]))).then((data) => response.status(action === 'create' ? 201 : 200).json({ success: true, data })).catch(next) }
export function list(resource) { return (request, response, next) => run(actions[resource][0], 'list', request, response, next) }
export function create(resource) { return (request, response, next) => run(actions[resource][1], resource === 'settings' ? 'upsert' : 'create', request, response, next) }
export function update(resource) { return (request, response, next) => run(actions[resource][2], 'update', request, response, next) }
export function remove(resource) { return (request, response, next) => run(actions[resource][3], 'delete', request, response, next) }