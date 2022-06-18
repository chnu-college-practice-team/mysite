import { createContext, useContext } from 'react'
import fetcher from 'lib/fetcher'
import useSWR from 'swr'
import type { User, Manga } from '@prisma/client'
import type { Comment } from 'lib/types'

interface Data {
  users: User[]
  comments: Comment[]
  mangas: Manga[]
}

const DataContext = createContext<Data>({
  users: [],
  comments: [],
  mangas: [],
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
  const { data: dataManga, error: errorManga} = useSWR<{ mangas: Manga[] }>(
    '/api/manga',
    fetcher
  )

  if (errorUser || errorComment || errorManga) return <>An error has occurred.</>

  return (
    <DataContext.Provider
      value={{ users: dataUser.users || [], comments: dataComment.comments || [], mangas: dataManga.mangas || [] }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const { users, comments, mangas } = useContext(DataContext)
  return { users, comments, mangas }
}
