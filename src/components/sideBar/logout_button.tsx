'use client'
import { useSupabase } from '@/app/providers'
import { useUser } from '@/store'
import { Button } from '@heroui/react'
import { LogOut } from 'lucide-react'

export function LogOutButton () {
  const { supabase } = useSupabase()
  const { openSideBarr, setStore } = useUser()

  const singOut = () => {
    setStore('user', null)
    supabase.auth.signOut()
  }
  return (
    openSideBarr
      ? (
        <Button
          onPress={singOut}
          color='danger'
          variant='flat'
        >
          Log out
        </Button>
      )
      : (
        <LogOut
          size={30}
          onClick={singOut}
          className='text-red-500 cursor-pointer'
        />
      )
  )
}