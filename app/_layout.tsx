import { Stack } from 'expo-router/stack'

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="(dashboard)" />
      <Stack.Screen name="auth" />
    </Stack>
  )
}
