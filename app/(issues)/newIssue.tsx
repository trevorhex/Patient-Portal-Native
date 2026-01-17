import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'
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
      <Text style={styles.text}>Create New Issue</Text>
      <IssueForm />
      <View style={styles.buttons}>
        <Button title="Cancel" onPress={router.back} variant="outlined" disabled={isPending} />
        <Button title={isPending ? 'Creating...' : 'Create Issue'} onPress={handleCreateIssue} disabled={isPending} />
      </View>
      <StatusBar style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...theme.container,
    paddingVertical: theme.spacing.large,
    justifyContent: 'space-between'
  },
  text: theme.title,
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.small
  }
})
