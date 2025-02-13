'use client'
import { Input } from '@heroui/react'

const SearchIcon = (props: any) => {
  return (
    <svg
      aria-hidden='true'
      fill='none'
      focusable='false'
      height='1em'
      role='presentation'
      viewBox='0 0 24 24'
      width='1em'
      {...props}
    >
      <path
        d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M22 22L20 20'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  )
}

export function SearchBarr () {
  return (
    <div className='bg-[#0a0a0a] h-16'>
      <div className='fixed z-20 w-screen left-0 top-0 flex justify-center'>
        <Input
          isClearable
          classNames={{
            label: 'text-black/50 dark:text-white/90',
            input: [
              'bg-transparent',
              'text-black/90 dark:text-white/90',
              'placeholder:text-default-700/50 dark:placeholder:text-white/60'
            ],
            innerWrapper: 'bg-transparent',
            inputWrapper: [
              'shadow-xl',
              'bg-default-200/50',
              'dark:bg-default/60',
              'backdrop-blur-xl',
              'backdrop-saturate-200',
              'hover:bg-default-200/70',
              'dark:hover:bg-default/70',
              'group-data-[focus=true]:bg-default-200/50',
              'dark:group-data-[focus=true]:bg-default/60',
              '!cursor-text'
            ]
          }}
          placeholder='Search...'
          radius='lg'
          startContent={
            <SearchIcon className='text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0' />
          }
          className='w-[550px] mt-6'
        />
      </div>
    </div>
  )
}