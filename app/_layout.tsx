import { Stack } from 'expo-router/stack'
import { useRouter } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { XIcon } from 'lucide-react-native'
import { IconButton } from '@/components/IconButton'

const queryClient = new QueryClient()

export default function RootLayout() {
  const router = useRouter()
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Screen name="auth" />
        <Stack.Screen name="(portal)" />
        <Stack.Screen name="(issues)/newIssue" options={{
          presentation: 'modal',
          title: 'New Issue',
          animation: 'slide_from_bottom',
          headerShown: true,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerRight: () => <IconButton
            onPress={router.back}
            accessibilityLabel="Add New Issue"
            Icon={XIcon}
          />,
        }} />
      </Stack>
    </QueryClientProvider>
  )
}
