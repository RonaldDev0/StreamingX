'use client'
import Image from 'next/image'
import { useSupabase } from '../providers'
import { Button } from '@heroui/react'

export default function Login () {
  const { supabase } = useSupabase()

  function login () {
    supabase.auth
      .signInWithOAuth({ provider: 'github' })
  }


  return (
    <main className='h-screen w-screen flex flex-col justify-center items-center'>
      <h1 className='font-bold text-4xl fixed top-56'>Streaming-X</h1>
      <Button
        onPress={() => login()}
        className='h-14 flex justify-center items-center gap-4 w-80 text-lg'
      >
        <Image
          src='/svg/github.svg'
          alt='Github'
          width='45'
          height='45'
        />
        <p>
          Continuar con Github
        </p>
      </Button>
    </main>
  )
}
