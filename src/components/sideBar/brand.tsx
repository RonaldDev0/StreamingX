import Link from 'next/link'

export function Brand () {
  return (
    <div className='w-64 flex justify-center'>
      <Link href='/'>
        <h1 className='text-neutral-400 text-3xl font-bold pt-4'>
          StreamingX
        </h1>
      </Link>
    </div>
  )
}