'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createPagesBrowserClient, type SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useUser } from '@/store'
import { HeroUIProvider } from '@heroui/react'

type Database = {
  public: {
    Tables: {
      movies: {
        Row: {}
        Insert: {}
        Update: {}
      }
    }
  }
}

type SupabaseContext = {
  supabase: SupabaseClient<Database>
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function Providers ({ children }: { children: ReactNode }) {
  const [supabase] = useState(() => createPagesBrowserClient())
  const router = useRouter()
  const { setStore } = useUser()


  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }: any) => {
        if (session) {
          setStore('user', {
            id: session.user.id,
            email: session.user.email,
            avatar: session.user.user_metadata.avatar_url,
            name: session.user.user_metadata.name,
            user_name: session.user.user_metadata.user_name
          })
        }
      })
  }, [])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((e) => {
      if (e === 'SIGNED_IN') {
        router.push('/')
      } else if (e === 'SIGNED_OUT') {
        router.push('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [router, supabase])

  return (
    <Context.Provider value={{ supabase }}>
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }

  return context
}
