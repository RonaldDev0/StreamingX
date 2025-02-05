'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createPagesBrowserClient, type SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

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


  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((e) => {
      if (e === 'SIGNED_IN') {
        router.push('/')
      }
    })

    return () => subscription.unsubscribe()
  }, [router, supabase])

  return (
    <Context.Provider value={{ supabase }}>
      {children}
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
