import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type UserState = {
  authToken: string | null
  setAuthToken: (token: string | null) => void
}

export const useUserStore = create(persist<UserState>((set) => ({
  authToken: null,
  setAuthToken: (token) => set({ authToken: token }),
}), {
  name: 'user-storage',
  storage: createJSONStorage(() => AsyncStorage)
}))
