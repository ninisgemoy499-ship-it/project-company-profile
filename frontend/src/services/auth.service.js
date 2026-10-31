const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1'
const SESSION_KEY = 'northstar_admin_session'

export const authService = {
  async login(email, password) {
    let response
    try {
      response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
    } catch {
      return { success: false, error: 'Backend tidak dapat dihubungi.' }
    }

    const result = await response.json().catch(() => null)
    if (!response.ok || !result?.success) {
      return { success: false, error: result?.message || 'Email atau password tidak sesuai.' }
    }

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(result.data))
    return { success: true, ...result.data }
  },
  logout() {
    sessionStorage.removeItem(SESSION_KEY)
  },
  getCurrentUser() {
    const session = sessionStorage.getItem(SESSION_KEY)
    return session ? JSON.parse(session).user : null
  },
  getToken() {
    const session = sessionStorage.getItem(SESSION_KEY)
    return session ? JSON.parse(session).token : null
  },
  isAuthenticated() {
    return Boolean(this.getCurrentUser())
  },
}