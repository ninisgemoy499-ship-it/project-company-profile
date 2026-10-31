import { authService } from '../services/auth.service.js'

export async function login(request, response, next) {
  try {
    const result = await authService.login(request.body)
    response.json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}
