'use client'
import { useSupabase } from './providers'

export default function HomePage () {
  const { supabase } = useSupabase()
  function login () {
    supabase.auth.signOut()
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <p className='text-neutral-400 text-3xl font-bold'>StreamingX</p>
      <button
        onClick={() => login()}
        className='p-3 bg-red-950 rounded-2xl hover:bg-red-900 transition-all'
      >
        singOut
      </button>
    </div>
  )
}