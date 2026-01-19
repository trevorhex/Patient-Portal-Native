export const issueStatus = ['backlog', 'todo', 'in_progress', 'done'] as const
export const issuePriority = ['low', 'medium', 'high'] as const

export type Status = typeof issueStatus[number]
export type Priority = typeof issuePriority[number]

export interface Issue {
  id: string
  title: string
  description: string
  status: Status
  priority: Priority
  createdAt: string
  updatedAt: string
}
