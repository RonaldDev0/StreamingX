import { Brand } from './brand'
import { LogOutButton } from './log-out-button'

export function SideBar () {
  return (
    <div className='border-r-2 border-gray-600 border-opacity-20 h-screen w-64 flex flex-col justify-between'>
      <Brand />
      <LogOutButton />
    </div>
  )
}