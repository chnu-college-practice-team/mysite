import { createContext, useContext } from 'react'
import fetcher from 'lib/fetcher'
import useSWR from 'swr'
import type { User } from '@prisma/client'
import type { Comment } from 'lib/types'

interface Data {
  users: User[]
  comments: Comment[]
}

const DataContext = createContext<Data>({
  users: [],
  comments: [],
})

export function DataProvider({ children }) {
  const { data: dataUser, error: errorUser } = useSWR<{ users: User[] }>(
    '/api/user',
    fetcher
  )
  const { data: dataComment, error: errorComment } = useSWR<{
    comments: Comment[]
  }>('/api/comment', fetcher, {
    refreshInterval: 1000,
  })

  const { users } = dataUser || {}
  const { comments } = dataComment || {}

  if (errorUser || errorComment) return <>An error has occurred.</>

  return (
    <DataContext.Provider
      value={{ users: users || [], comments: comments || [] }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const { users, comments } = useContext(DataContext)
  return { users, comments }
}
