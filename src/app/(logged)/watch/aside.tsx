'use client'
import { Tab, Tabs } from '@heroui/tabs'
import { Videos } from './videos'
import { Comments } from './comments'
import type { ReactNode } from 'react'

type TabItem = {
  title: ReactNode,
  key: string,
  children: ReactNode
}

export function Aside () {
  const tabs: TabItem[] = [
    {
      title: 'Related videos',
      key: 'related',
      children: <Videos />
    },
    {
      title: 'Comments',
      key: 'comments',
      children: <Comments />
    }
  ]

  return (
    <aside className='w-full flex flex-col items-center'>
      <Tabs defaultSelectedKey='related'>
        {tabs.map(tab => (
          <Tab key={tab.key} title={tab.title}>
            <div className='overflow-y-auto scrollbar-hide focus:outline-none focus:ring-0 h-[830px] space-y-6'>
              {tab.children}
            </div>
          </Tab>
        ))}
      </Tabs>
    </aside>
  )
}
