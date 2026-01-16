import { useMutation, useQueryClient } from '@tanstack/react-query'
import Constants from 'expo-constants'
import { useSessionStore } from '@/stores/session'
import { API_ROUTES } from '@/config/routes'

const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl
const AUTH_ROUTE = `${API_BASE_URL}${API_ROUTES.auth}`

interface AuthResponse {
  success: boolean
  message?: string
  token?: string
  error?: string
  errors?: Record<string, string[]>
}

interface LoginCredentials {
  email: string
  password: string
}

enum AuthAction {
  SIGNUP = 'signup',
  LOGIN = 'login',
  REFRESH = 'refresh'
}

const refreshToken = async (token: string): Promise<AuthResponse> => {
  const response = await fetch(AUTH_ROUTE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ action: AuthAction.REFRESH })
  })
  return response.json()
}

export const useAuthenticate = (action: AuthAction = AuthAction.LOGIN) => {
  const queryClient = useQueryClient()
  const { logIn } = useSessionStore()

  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      const response = await fetch(AUTH_ROUTE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...credentials })
      })
      return response.json()
    },
    onSuccess: async (data) => {
      if (data.success && data.token) {
        logIn(data.token)
        queryClient.invalidateQueries({ queryKey: ['auth'] })
      }
    },
    onError: (error: any) => {
      console.error(`${action} error:`, error)
    }
  })
}

export const useLogin = () => useAuthenticate(AuthAction.LOGIN)
export const useSignup = () => useAuthenticate(AuthAction.SIGNUP)

export const useLogout = () => {
  const queryClient = useQueryClient()
  const { authToken, logOut } = useSessionStore()

  return useMutation({
    mutationFn: async () => {
      if (authToken) {
        await fetch(AUTH_ROUTE, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
      }
    },
    onSettled: async () => {
      logOut()
      queryClient.clear()
    }
  })
}

export const fetchWithToken = async (url: string, options: RequestInit = {}) => {
  const store = useSessionStore.getState()
  const { authToken } = store
  
  if (!authToken) throw new Error('No auth token available')
  
  const makeRequest = async (token: string) =>
    fetch(url, { ...options, headers: { ...options.headers, 'Authorization': `Bearer ${token}` } })

  let response = await makeRequest(authToken)

  if (response.ok && response.headers.get('X-Token-Refresh-Suggested') === 'true') {
    try {
      const refreshResponse = await refreshToken(authToken)
      if (refreshResponse.success && refreshResponse.token) {
        store.logIn(refreshResponse.token)
      }
    } catch {}
  }
  
  if (response.status === 401) {
    const refreshResponse = await refreshToken(authToken)
    if (refreshResponse.success && refreshResponse.token) {
      store.logIn(refreshResponse.token)
      response = await makeRequest(refreshResponse.token)
    } else {
      store.logOut()
      throw new Error('Authentication failed')
    }
  }
  
  return response
}
