'use client'
import Image from 'next/image'
import { useSupabase } from '../providers'
import { Button } from '@heroui/react'
import { useUser } from '@/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Login () {
  const router = useRouter()
  const { supabase } = useSupabase()
  const { user } = useUser()

  function login () {
    supabase.auth
      .signInWithOAuth({ provider: 'github' })
  }

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  return (
    <main className='bg-[#0a0a0a] h-screen w-full fixed z-30 top-0 left-0 flex flex-col justify-center items-center'>
      <h1 className='font-bold text-4xl fixed top-56'>
        Streaming-X
      </h1>
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
