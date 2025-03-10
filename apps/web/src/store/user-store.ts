import { create } from "zustand"

export type RoleType = "ADMIN" | "USER" | "SECRETARY" | "ENGINEER" | null

export interface User{
    id:string
    role: RoleType
    username:string
}

interface UserState {
  user: User,
  setUser: (user: User) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: {
      id: "",
      role: null,
      username: ""
  },
  setUser: (user) => set({ user: user }),
}))

