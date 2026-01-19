import { ReactNode } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Status, Priority } from '@/types/issue'
import theme from '@/theme'

export interface ChipProps {
  children?: ReactNode
  status?: Status
  priority?: Priority
}

export const Chip = ({ children, status, priority }: ChipProps) => {
  return (
    <Text style={[
      styles.chip,
      status && styles[statusVariants[status]],
      priority && styles[priorityVariants[priority]]
    ]}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  chip: {
    color: theme.colors.text,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    textTransform: 'capitalize'
  },
  default: {
    backgroundColor: theme.colors.primary900,
    color: theme.colors.primary300
  },
  secondary: {
    backgroundColor: theme.colors.gray700,
    color: theme.colors.gray300
  },
  success: {
    backgroundColor: theme.colors.secondary900,
    color: theme.colors.secondary300
  },
  warning: {
    backgroundColor: theme.colors.accent900,
    color: theme.colors.accent300
  },
  danger: {
    backgroundColor: theme.colors.error900,
    color: theme.colors.error300
  }
})

export type ChipVariant = 'default' | 'secondary' | 'success' | 'warning' | 'danger'

const statusVariants: { [K in Status]: ChipVariant } = {
  backlog: 'secondary',
  todo: 'default',
  in_progress: 'warning',
  done: 'success'
}

const priorityVariants: { [K in Priority]: ChipVariant } = {
  low: 'secondary',
  medium: 'default',
  high: 'danger'
}
