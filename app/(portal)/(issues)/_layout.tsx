import { Stack, router } from 'expo-router'
import { IconButton } from '@/components/IconButton'
import { PlusIcon } from 'lucide-react-native'
import { ROUTES } from '@/config/routes'
import theme from '@/theme'

export default function IssuesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerShadowVisible: true,
        headerTitleStyle: { color: theme.colors.text },
        headerTintColor: theme.colors.text,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Issues',
          headerRight: () => <IconButton
            onPress={() => router.push(ROUTES.issues.new)}
            accessibilityLabel="Add New Issue"
            Icon={PlusIcon}
          />
        }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ title: 'Issue Details' }} 
      />
    </Stack>
  )
}
