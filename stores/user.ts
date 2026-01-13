import { create } from 'zustand'

export type UserState = {
  authToken: string | null
  setAuthToken: (token: string | null) => void
}

export const useUserStore = create<UserState>((set) => ({
  authToken: null,
  setAuthToken: (token) => set({ authToken: token }),
}))
