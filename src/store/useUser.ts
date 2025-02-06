import { create } from 'zustand'

type State = {
  user: {
    id: string,
    email: string,
    avatar: string,
    name: string,
    user_name: string
  } | null,
  openSideBarr: boolean
}

type Actions = {
  setStore: (property: keyof State, value: any) => void
}

export const useUser = create<State & Actions>(set => ({
  user: null,
  openSideBarr: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('SideBarOpen') || 'false') : false,
  setStore: (property, value) => set(prevState => ({ ...prevState, [property]: value }))
}))
