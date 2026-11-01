import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { env } from '../config/env.js'
import { userRepository } from '../repositories/user.repository.js'

const loginSchema = z.object({
  email: z.string().trim().email('A valid email is required'),
  password: z.string().min(1, 'Password is required'),
})

export const authService = {
  async login(input) {
    const parsedInput = loginSchema.safeParse(input)
    if (!parsedInput.success) {
      const error = new Error(parsedInput.error.issues[0]?.message || 'Email and password are required')
      error.statusCode = 400
      throw error
    }

    const { email, password } = parsedInput.data
    const user = await userRepository.findByEmail(email.toLowerCase())
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
