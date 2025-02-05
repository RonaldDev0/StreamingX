'use client'
import Image from 'next/image'
import { useSupabase } from '../providers'

export default function Login () {
  const { supabase } = useSupabase()

  function login () {
    supabase.auth
      .signInWithOAuth({ provider: 'github' })
  }


  return (
    <main className='h-screen w-screen flex flex-col justify-center items-center'>
      <h1 className='font-bold text-4xl fixed top-56'>Streaming-X</h1>
      <button
        onClick={() => login()}
        className='flex justify-center items-center gap-4 w-80 p-4 text-lg bg-zinc-800 rounded-2xl hover:bg-zinc-900 transition-all'
      >
        <Image
          src='/svg/github.svg'
          alt='Google'
          width='45'
          height='45'
        />
        <p>
          Continuar con Google
        </p>
      </button>
    </main>
  )
}
