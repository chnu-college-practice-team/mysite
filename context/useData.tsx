import { createContext, useContext } from 'react'
import fetcher from 'lib/fetcher'
import useSWR from 'swr'
import type { User, Manga, Genre } from '@prisma/client'
import type { Comment } from 'lib/types'

interface Data {
  users: User[]
  comments: Comment[]
  mangas: Manga[]
  genres: Genre[]
}

const DataContext = createContext<Data>({
  users: [],
  comments: [],
  mangas: [],
  genres: []
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
  const { data: dataGenre, error: errorGenre} = useSWR<{ genres: Genre[] }>(
    '/api/manga/genre',
    fetcher
  )

  if (errorUser || errorComment || errorManga || errorGenre) return <>An error has occurred.</>

  return (
    <DataContext.Provider
      value={{ users: dataUser?.users || [], comments: dataComment?.comments || [], mangas: dataManga?.mangas || [],
        genres: dataGenre?.genres || []}}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const { users, comments, mangas, genres } = useContext(DataContext)
  return { users, comments, mangas, genres }
}
