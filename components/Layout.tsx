import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Loader from './Loader'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin')
    },
  })

  if (status === 'loading') {
    return <Loader />
  }

  return <main className="container">{children}</main>
}

export default Layout
