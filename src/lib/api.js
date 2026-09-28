const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8787').replace(/\/$/, '')

export function getAuthToken() {
  return localStorage.getItem('supabase.access_token') || localStorage.getItem('access_token') || import.meta.env.VITE_ADMIN_TOKEN || ''
}

export function clearAuthStorage() {
  const clearMatchingKeys = (storage) => {
    Object.keys(storage).forEach((key) => {
      if (/supabase|access_token|refresh_token|session/i.test(key)) storage.removeItem(key)
    })
  }

  clearMatchingKeys(localStorage)
  clearMatchingKeys(sessionStorage)
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers)
  const token = getAuthToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)
  if (options.body && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json')

  const response = await fetch(`${API_URL}${path}`, { ...options, headers })
  const contentType = response.headers.get('content-type') || ''
  const result = contentType.includes('application/json') ? await response.json() : null
  if (!response.ok) {
    const error = new Error(result?.error || `Request failed with status ${response.status}`)
    error.status = response.status
    throw error
  }
  return result
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
  getBlob: async (path) => {
    const headers = new Headers()
    const token = getAuthToken()
    if (token) headers.set('Authorization', `Bearer ${token}`)
    const response = await fetch(`${API_URL}${path}`, { headers })
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
    return response.blob()
  },
}

export async function logout(redirectPath = '/admin/sign-in') {
  try {
    await request('/api/auth/sign-out', { method: 'POST', body: '{}' })
  } catch (error) {
    void error
  } finally {
    clearAuthStorage()
    window.history.replaceState({}, '', redirectPath)
    window.dispatchEvent(new Event('app:navigate'))
  }
}

export function apiErrorMessage(error) {
  if (error?.status === 401) return 'Sign in with a parish administrator account to view this page.'
  if (error?.status === 403) return 'Your account does not have permission for this action.'
  return error?.message || 'Unable to connect to the parish server.'
}
