import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { DataProvider } from 'context/useData'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </SessionProvider>
  )
}
