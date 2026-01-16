import { Stack } from 'expo-router/stack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Screen name="auth" />
        <Stack.Screen name="(portal)" />
        <Stack.Screen name="(issues)/newIssue" options={{
          presentation: 'modal',
          title: 'New Item',
          animation: 'slide_from_bottom'
        }} />
      </Stack>
    </QueryClientProvider>
  )
}
