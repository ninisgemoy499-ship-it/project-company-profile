const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1'

async function request(resource, options = {}) {
  const session = sessionStorage.getItem('northstar_admin_session')
  const token = session ? JSON.parse(session).token : ''
  const response = await fetch(`${API_URL}/admin/${resource}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...options.headers },
  })
  const result = await response.json().catch(() => null)
  if (!response.ok || !result?.success) throw new Error(result?.message || 'Request failed')
  return result.data
}

export const adminApi = {
  list: (resource) => request(resource),
  create: (resource, data) => request(resource, { method: 'POST', body: JSON.stringify(data) }),
  update: (resource, id, data) => request(`${resource}/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (resource, id) => request(`${resource}/${id}`, { method: 'DELETE' }),
}