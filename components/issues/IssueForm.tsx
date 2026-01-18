import { StyleSheet, TextInput, Text, View } from 'react-native'
import { Button } from '@/components/Button'
import { useRouter } from 'expo-router'
import { useState, useRef, useEffect } from 'react'
import { useCreateIssue } from '@/services/issues'
import { issueStatus, issuePriority } from '@/types/issue'
import theme from '@/theme'

type StateValue = string | null | Record<string, string[]>

export const IssueForm = () => {
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
      <View>
        <Text style={theme.inputLabel}>Title</Text>
        <TextInput
          placeholder="Issue Title"
          style={[
            theme.input,
            focusedInput === 'title' && theme.focusedInput,
            errors?.title && theme.inputError
          ]}
          value={values.title}
          placeholderTextColor={theme.colors.gray}
          onChangeText={val => setState('title', val)}
          onFocus={() => setState('focusedInput', 'title')}
          onBlur={() => setState('focusedInput', null)}
        />
      </View>
      <View>
        <Text style={theme.inputLabel}>Description</Text>
        <TextInput
          placeholder="Issue Description"
          multiline
          numberOfLines={5}
          style={[
            theme.input,
            theme.textarea,
            focusedInput === 'description' && theme.focusedInput,
            errors?.description && theme.inputError
          ]}
          value={values.description}
          placeholderTextColor={theme.colors.gray}
          onChangeText={val => setState('description', val)}
          onFocus={() => setState('focusedInput', 'description')}
          onBlur={() => setState('focusedInput', null)}
        />  
      </View>
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
