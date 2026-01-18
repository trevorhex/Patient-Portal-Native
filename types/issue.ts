export const issueStatus = ['backlog', 'todo', 'in_progress', 'done'] as const
export const issuePriority = ['low', 'medium', 'high'] as const

export interface Issue {
  id: string
  title: string
  description: string
  status: typeof issueStatus[number]
  priority: typeof issuePriority[number]
  createdAt: string
  updatedAt: string
}
