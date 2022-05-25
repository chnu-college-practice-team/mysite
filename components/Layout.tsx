import React from 'react'
import CommandPalette from './CommandPalette'
import Header from './Headers'
import useSWR from 'swr'
import type { User } from '@prisma/client'
import fetcher from 'lib/fetcher'
import useRequireAuth from 'lib/useRequireAuth'
import { useData } from 'context/useData'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const session = useRequireAuth()
  if (!session) return <>Loading...</>

  return (
    <>
      <Header />
      <CommandPalette />
      <main className="container">{children}</main>
    </>
  )
}

export default Layout
