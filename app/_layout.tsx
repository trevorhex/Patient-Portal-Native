import { Stack } from 'expo-router/stack'
import { ROUTES } from '@/config/routes'

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="(portal)" />
      <Stack.Screen name="(issues)/newIssue" options={{
        presentation: 'modal',
        title: 'New Item',
        animation: 'slide_from_bottom'
      }} />
      <Stack.Screen name="auth" />
    </Stack>
  )
}
