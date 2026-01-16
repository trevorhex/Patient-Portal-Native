import Constants from 'expo-constants'
import { useQuery as useQueryFn, useMutation as useMutationFn, QueryKey, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import { fetchWithToken } from '@/services/session'

const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl

export type ApiRequestOptions = Omit<RequestInit, 'headers'> & {
  authenticate?: boolean
  headers?: Record<string, string>
}

export const useQuery = <TData = any>(
  queryKey: QueryKey,
  endpoint: string,
  requestOptions: ApiRequestOptions = {},
  options: Omit<UseQueryOptions<TData, Error, TData, QueryKey>, 'queryKey' | 'queryFn'> = {}
) => {
  const { headers: customHeaders, authenticate = false, ...fetchOptions } = requestOptions

  return useQueryFn({
    queryKey,
    queryFn: async (): Promise<TData> => {
      let headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...customHeaders
      }

      const response = await (authenticate ? fetchWithToken : fetch)(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        ...fetchOptions,
        headers
      })

      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`)

      return response.json()
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    ...options
  })
}

export const useAuthenticatedQuery = <TData = any>(
  queryKey: QueryKey,
  endpoint: string,
  requestOptions: Omit<ApiRequestOptions, 'authToken'> = {},
  options: Omit<UseQueryOptions<TData, Error, TData, QueryKey>, 'queryKey' | 'queryFn'> = {}
) => {
  return useQuery<TData>(queryKey, endpoint, { ...requestOptions, authenticate: true }, options)
}

export const useMutation = <TData = any, TVariables = any>(
  endpoint: string,
  requestOptions: Omit<ApiRequestOptions, 'method'> & { method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH' } = {},
  options: Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'> = {}
) => {
  const { method = 'POST', headers: customHeaders, authenticate = false, ...fetchOptions } = requestOptions

  return useMutationFn({
    mutationFn: async (variables: TVariables): Promise<TData> => {
      let headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...customHeaders
      }

      const body = variables ? JSON.stringify(variables) : undefined
      
      const response = await (authenticate ? fetchWithToken : fetch)(`${API_BASE_URL}${endpoint}`, {
        method,
        ...fetchOptions,
        headers,
        body
      })

      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`)

      return response.json()
    },
    ...options
  })
}

export const useAuthenticatedMutation = <TData = any, TVariables = any>(
  endpoint: string,
  requestOptions: Omit<ApiRequestOptions, 'authToken'> & { method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH' } = {},
  options: Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'> = {}
) => {
  return useMutation<TData, TVariables>(endpoint, { ...requestOptions, authenticate: true }, options)
}
