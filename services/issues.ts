import { useAuthenticatedQuery, useAuthenticatedMutation } from '@/lib/api'
import { useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '@/config/routes'
import { Issue } from '@/types/issue'

export type IssueMutationReturn = {
  success: boolean
  issue?: Issue
  error?: string
  errors?: Record<string, string[]>
}

export const ISSUES_QUERY_KEY = ['issues'] as const

export const useGetIssues = () => useAuthenticatedQuery<{ issues: Issue[] }>(
  ISSUES_QUERY_KEY,
  API_ROUTES.issues
)

export const useGetIssue = (id: string) => useAuthenticatedQuery<{ issue: Issue }>(
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
      onSuccess: ({ issue }) => {
        issue && queryClient.invalidateQueries({ queryKey: ISSUES_QUERY_KEY })
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
      onSuccess: ({ issue }) => {
        issue && queryClient.setQueryData([...ISSUES_QUERY_KEY, id], { issue })
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
        queryClient.removeQueries({ queryKey: [...ISSUES_QUERY_KEY, id] })
        queryClient.invalidateQueries({ queryKey: ISSUES_QUERY_KEY })
      },
      onError: (error: any) => {
        console.error('Error deleting issue:', error)
      }
    }
  )
}
