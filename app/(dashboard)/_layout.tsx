import { Redirect, Tabs } from 'expo-router'
import { Home, User } from 'lucide-react-native'
import theme from '@/theme'
import { ROUTES } from '@/config/routes'
import { useUserStore } from '@/stores/user'

export default function DashboardLayout() {
  const authToken = useUserStore(state => state.authToken)
  if (!authToken) return <Redirect href={ROUTES.auth} />

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.borderDark,
          borderTopWidth: 1,
          paddingTop: 12,
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.borderDark,
          borderBottomWidth: 1
        },
        headerTitleStyle: {
          color: theme.colors.text,
        }
      }}
    >
      <Tabs.Screen name="index" options={{
        tabBarAccessibilityLabel: 'Dashboard',
        tabBarShowLabel: false,
        tabBarIcon: (props) => <Home {...props} />,
        tabBarBadge: '3'
      }} />
      <Tabs.Screen name="profile/index" options={{
        tabBarAccessibilityLabel: 'Profile',
        tabBarShowLabel: false,
        tabBarIcon: (props) => <User {...props} />
      }} />
    </Tabs>
  )
}
