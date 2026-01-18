import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import { IssueForm } from '@/components/issues/IssueForm'
import { Button } from '@/components/Button'
import theme from '@/theme'

export default function NewIssueScreen() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const isMounted = useRef(true)

  useEffect(() => {
    return () => { isMounted.current = false }
  }, [])

  const handleCreateIssue = async () => {
    setIsPending(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
    } finally {
      if (isMounted.current) router.back()
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <IssueForm />
        <Button
          title={isPending ? 'Creating...' : 'Create Issue'}
          onPress={handleCreateIssue}
          disabled={isPending}
        />
      </View>
      <StatusBar style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...theme.container,
    gap: theme.spacing.medium
  },
  form: {
    gap: theme.spacing.small / 2
  }
})
