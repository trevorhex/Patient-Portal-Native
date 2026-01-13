import { Redirect, Tabs, router } from 'expo-router'
import { useShallow } from 'zustand/react/shallow'
import { Home, ScanHeart, List, Settings, LogOut, PlusIcon } from 'lucide-react-native'
import theme from '@/theme'
import { ROUTES } from '@/config/routes'
import { useUserStore } from '@/stores/user'
import { IconButton } from '@/components/IconButton'

export default function PortalLayout() {
  const { authToken, logOut } = useUserStore(useShallow(store => ({
    authToken: store.authToken,
    logOut: store.logOut
  })))
  if (!authToken) return <Redirect href={ROUTES.auth} />

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.borderDark,
          borderTopWidth: 1,
          paddingTop: 4,
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
        title: 'Dashboard',
        tabBarIcon: (props) => <Home {...props} />
      }} />
      <Tabs.Screen name="profile" options={{
        tabBarAccessibilityLabel: 'Patient Profile',
        tabBarShowLabel: false,
        title: 'Patient Profile',
        tabBarIcon: (props) => <ScanHeart {...props} />
      }} />
      <Tabs.Screen name="issues" options={{
        tabBarAccessibilityLabel: 'Issues',
        tabBarShowLabel: false,
        title: 'Issues',
        tabBarIcon: (props) => <List {...props} />,
        headerRight: () => <IconButton
          onPress={() => router.push(ROUTES.issues.new)}
          accessibilityLabel="Add New Issue"
          Icon={PlusIcon}
        />
      }} />
      <Tabs.Screen name="account" options={{
        tabBarAccessibilityLabel: 'Account',
        tabBarShowLabel: false,
        title: 'Account',
        tabBarIcon: (props) => <Settings {...props} />,
        headerRight: () => <IconButton
          onPress={logOut}
          accessibilityLabel="Log Out"
          Icon={LogOut}
        />
      }} />
    </Tabs>
  )
}
