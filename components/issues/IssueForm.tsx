import { StyleSheet, View } from 'react-native'
import { Button } from '@/components/Button'
import { useRouter } from 'expo-router'
import { useState, useRef, useEffect } from 'react'
import { useCreateIssue } from '@/services/issues'
import { issueStatus, issuePriority } from '@/types/issue'
import { Input } from '@/components/form/Input'
import { Textarea } from '@/components/form/Textarea'
import { Select } from '@/components/form/Select'
import theme from '@/theme'

type StateValue = string | null | Record<string, string[]>

export interface IssueFormProps {
  issueId?: string
  mode: 'create' | 'edit'
}

export const IssueForm = (props: IssueFormProps) => {
  const router = useRouter()
  const isMounted = useRef(true)

  const [{ focusedInput, errors, ...values }, setFormState] = useState({
    title: '',
    description: '',
    status: issueStatus[0],
    priority: issuePriority[0],
    focusedInput: null as null | 'title' | 'description' | 'status' | 'priority',
    errors: null as null | Record<string, string[]>
  })
  const setState = (key: string, value: StateValue) => setFormState(state => ({ ...state, [key]: value }))
  const createIssueMutation = useCreateIssue()

  useEffect(() => {
    return () => { isMounted.current = false }
  }, [])

  const handleCreateIssue = async () => {
    try {
      const result = await createIssueMutation.mutateAsync(values)
      
      if (result.success) {
        router.back()
      } else {
        result.errors && setState('errors', result.errors)
      }
    } catch (e) {
      console.error('Error creating issue:', e)
    }
  }

  errors && console.log('errors', errors)

  return (
    <View style={styles.form}>
      <Input
        label="Title"
        placeholder="Issue Title"
        value={values.title}
        error={!!errors?.title}
        onChangeText={(val) => setState('title', val)}
        onFocus={() => setState('focusedInput', 'title')}
        onBlur={() => setState('focusedInput', null)}
        focused={focusedInput === 'title'}
      />
      <Textarea
        label="Description"
        placeholder="Issue Description"
        value={values.description}
        error={!!errors?.description}
        onChangeText={(val) => setState('description', val)}
        onFocus={() => setState('focusedInput', 'description')}
        onBlur={() => setState('focusedInput', null)}
        focused={focusedInput === 'description'}
      />
      <Select
        label="Status"
        value={values.status}
        options={issueStatus.map(status => ({
          label: status.replace('_', ' '),
          value: status
        }))}
        focused={focusedInput === 'status'}
        error={!!errors?.status}
        onChange={(val) => setState('status', val)}
      />
      <Select
        label="Priority"
        value={values.priority}
        options={issuePriority.map(priority => ({
          label: priority.replace('_', ' '),
          value: priority
        }))}
        focused={focusedInput === 'priority'}
        error={!!errors?.priority}
        onChange={(val) => setState('priority', val)}
      />
      <Button
        title={createIssueMutation.isPending ? 'Creating...' : 'Create Issue'}
        onPress={handleCreateIssue}
        disabled={createIssueMutation.isPending}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    gap: theme.spacing.small
  }
})
