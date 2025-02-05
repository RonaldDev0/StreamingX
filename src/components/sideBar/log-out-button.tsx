'use client'
import { useSupabase } from '@/app/providers'


export function LogOutButton () {
  const { supabase } = useSupabase()
  return (
    <button
      onClick={() => supabase.auth.signOut()}
      className='p-2 bg-red-950 rounded-lg hover:bg-red-900 transition-all'
    >
      Log Out
    </button>
  )
}