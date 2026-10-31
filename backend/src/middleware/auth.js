import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export function requireAuth(request, _response, next) {
  const token = request.headers.authorization?.replace('Bearer ', '')
  if (!token) {
    const error = new Error('Authentication required')
    error.statusCode = 401
    return next(error)
  }

  try {
    request.user = jwt.verify(token, env.JWT_SECRET)
    next()
  } catch {
    const error = new Error('Invalid or expired token')
    error.statusCode = 401
    next(error)
  }
}
