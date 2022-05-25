import { createContext, useContext } from 'react'
import fetcher from 'lib/fetcher'
import useSWR from 'swr'
import type { User } from '@prisma/client'

interface Data {
  users: User[]
}

const DataContext = createContext<Data>({
  users: [],
})

export function DataProvider({ children }) {
  const { data, error } = useSWR<{ users: User[] }>('/api/user', fetcher)
  if (error) return <>An error has occurred.</>

  return (
    <DataContext.Provider value={{ users: data?.users || [] }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const { users } = useContext(DataContext)
  return { users }
}
