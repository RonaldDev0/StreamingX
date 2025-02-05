import Link from 'next/link'

type IProps = {
  id: string,
  title: string
}

export function VideoCard ({ title, id }: IProps) {
  return (
    <Link href={`/watch?v=${id}`}>
      <div className='border-2 border-gray-600 border-opacity-20 w-96 h-60 rounded-xl flex justify-center items-center cursor-pointer hover:border-opacity-90 transition-all'>
        {title}
      </div>
    </Link>
  )
}