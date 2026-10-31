import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { userRepository } from '../repositories/user.repository.js'

export const authService = {
  async login({ email, password }) {
    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
      const error = new Error('Email and password are required')
      error.statusCode = 400
      throw error
    }

    const user = await userRepository.findByEmail(email)
    const validPassword = user && await bcrypt.compare(password, user.passwordHash)
    if (!validPassword) {
      const error = new Error('Invalid email or password')
      error.statusCode = 401
      throw error
    }

    const token = jwt.sign({ sub: user.id.toString(), role: user.role }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN })
    return { token, user: { id: user.id.toString(), name: user.name, email: user.email, role: user.role } }
  },
}
