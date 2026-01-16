import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Session = {
  authToken: string | null
  isAuthenticated: boolean
  logIn: (authToken: string) => void
  logOut: () => void
}

export const useSessionStore = create(persist<Session>((set, get) => ({
  authToken: null,
  isAuthenticated: false,
  logIn: (authToken: string) => set({ 
    authToken, 
    isAuthenticated: !!authToken 
  }),
  logOut: () => set({ 
    authToken: null, 
    isAuthenticated: false 
  })
}), {
  name: 'user-storage',
  storage: createJSONStorage(() => AsyncStorage),
  onRehydrateStorage: () => (state) => {
    if (state) state.isAuthenticated = !!state.authToken
  }
}))
