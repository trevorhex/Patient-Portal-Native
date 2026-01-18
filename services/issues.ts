import { useAuthenticatedQuery, useAuthenticatedMutation } from '@/lib/api'
import { useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '@/config/routes'
import { Issue } from '@/types/issue'

export type IssueMutationReturn = {
  success: boolean
  data?: Issue
  error?: string
  errors?: Record<string, string[]>
}

export const ISSUES_QUERY_KEY = ['issues'] as const

export const useGetIssues = () => useAuthenticatedQuery<Issue[]>(
  ISSUES_QUERY_KEY,
  API_ROUTES.issues
)

export const useGetIssue = (id: string) => useAuthenticatedQuery<Issue>(
  [...ISSUES_QUERY_KEY, id],
  `${API_ROUTES.issues}/${id}`,
  {},
  { enabled: !!id }
)

export const useCreateIssue = () => {
  const queryClient = useQueryClient()

  return useAuthenticatedMutation<IssueMutationReturn, Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>>(
    API_ROUTES.issues,
    { method: 'POST' },
    {
      onSuccess: (response) => {
        if (response.data) {
          queryClient.setQueryData<Issue[]>(ISSUES_QUERY_KEY, (existing) =>
            existing ? [response.data!, ...existing] : [response.data!])
          queryClient.invalidateQueries({ queryKey: ISSUES_QUERY_KEY })
        }
      },
      onError: (error: any) => {
        console.error('Error creating issue:', error)
      }
    }
  )
}

export const useUpdateIssue = (id: string) => {
  const queryClient = useQueryClient()

  return useAuthenticatedMutation<IssueMutationReturn, Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>>(
    `${API_ROUTES.issues}/${id}`,
    { method: 'PUT' },
    {
      onSuccess: (response) => {
        if (response.data) {
          queryClient.setQueryData([...ISSUES_QUERY_KEY, id], response.data)
          queryClient.setQueryData<Issue[]>(ISSUES_QUERY_KEY, (existing) =>
            existing ? existing.map(issue => issue.id === id ? response.data! : issue) : [response.data!])
        }
      },
      onError: (error: any) => {
        console.error('Error updating issue:', error)
      }
    }
  )
}

export const useDeleteIssue = (id: string) => {
  const queryClient = useQueryClient()

  return useAuthenticatedMutation<IssueMutationReturn>(
    `${API_ROUTES.issues}/${id}`,
    { method: 'DELETE' },
    {
      onSuccess: () => {
        queryClient.setQueryData<Issue[]>(ISSUES_QUERY_KEY, (existing) =>
          existing ? existing.filter(issue => issue.id !== id) : [])
        queryClient.removeQueries({ queryKey: [...ISSUES_QUERY_KEY, id] })
      },
      onError: (error: any) => {
        console.error('Error deleting issue:', error)
      }
    }
  )
}
