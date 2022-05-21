import React from 'react'
import CommandPalette from './CommandPalette'
import Header from './Headers'
import useSWR from 'swr'
import type { User } from '@prisma/client'
import fetcher from 'lib/fetcher'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data, error } = useSWR < { users: User[] }>(
    '/api/user',
    fetcher,
  )
  if (error) return <>An error has occurred.</>
  if (!data) return <>Loading...</>

  return (
    <>
      <Header />
      <CommandPalette users={data.users}/>
      <main className="container">{children}</main>
    </>
  )
}

export default Layout
