import { create } from 'zustand'

type State = {
  user: {
    id: string,
    email: string,
    avatar: string,
    name: string,
    user_name: string
  } | null,
}

type Actions = {
  setStore: (property: keyof State, value: any) => void
}

export const useUser = create<State & Actions>(set => ({
  user: null,
  setStore: (property, value) => set(prevState => ({ ...prevState, [property]: value }))
}))
