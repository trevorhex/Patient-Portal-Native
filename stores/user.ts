import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type UserState = {
  authToken: string | null
  setAuthToken: (authToken: string | null) => void
}

export const useUserStore = create(persist<UserState>((set) => ({
  authToken: null,
  setAuthToken: (authToken: string | null) => set({ authToken })
  }), {
  name: 'user-storage',
  storage: createJSONStorage(() => AsyncStorage)
}))
