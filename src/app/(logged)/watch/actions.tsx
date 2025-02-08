import { Button } from '@heroui/react'
import { ThumbsUp, Share2, ThumbsDown } from 'lucide-react'

export function Actions () {
  return (
    <div className='flex items-center gap-4 mt-2'>
      <Button className='flex items-center gap-2'>
        <ThumbsUp size={16} /> 10K
      </Button>
      <Button className='flex items-center gap-2'>
        <ThumbsDown size={16} /> 500
      </Button>
      <Button className='flex items-center gap-2'>
        <Share2 size={16} /> Share
      </Button>
    </div>
  )
}