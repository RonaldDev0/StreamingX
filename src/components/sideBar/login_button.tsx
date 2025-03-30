'use client'
import { useUser } from '@/store'
import Link from 'next/link'
import { Button } from '@heroui/react'
import { UserRoundPlus } from 'lucide-react'

export function LoginButton () {
  const { openSideBarr } = useUser()


  return (
    <Link href='/login' className='w-full'>
      {
        openSideBarr
          ? (
            <Button
              color='primary'
              variant='flat'
              className='w-full'
            >
              Login
            </Button>
          )
          : (
            <UserRoundPlus
              size={30}
              className='text-primary cursor-pointer ml-2'
            />
          )
      }
    </Link>
  )
}