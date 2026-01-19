import { useRouter } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '@/components/Button'
import theme from '@/theme'
import { ROUTES } from '@/config/routes'

export const NoIssues = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text style={theme.title}>No Issues</Text>
      <Button title="Create An Issue" onPress={() => router.navigate(ROUTES.issues.new)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...theme.container,
    gap: theme.spacing.medium
  }
})
