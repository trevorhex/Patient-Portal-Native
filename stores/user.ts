import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { Alert } from 'react-native'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ROUTES } from '@/config/routes'

export type UserState = {
  authToken: string | null
  logIn: (authToken: string) => void
  logOut: () => void
}

export const useUserStore = create(persist<UserState>((set) => ({
  authToken: null,
  logIn: (authToken) => {
    set({ authToken })
    router.replace(ROUTES.dashboard)
  },
  logOut: () => Alert.alert('Log Out', 'Are you sure you want to log out?',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => set({ authToken: null }) }
    ])
  }), {
  name: 'user-storage',
  storage: createJSONStorage(() => AsyncStorage)
}))
