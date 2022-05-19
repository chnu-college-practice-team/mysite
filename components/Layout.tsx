import React from 'react'
import Header from './Headers'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
    </>
  )
}

export default Layout
