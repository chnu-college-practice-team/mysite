import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
} from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect } from 'react'
import Loader from 'components/Loader'
import { GetServerSideProps, NextPage } from 'next'
import { BuiltInProviderType } from 'next-auth/providers'

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >
}

const Signin: NextPage<Props> = ({ providers }) => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/')
    }
  }, [router, session])

  if (session) return <Loader />

  return (
    <div className="flex h-screen flex-col items-center space-y-8 bg-black pt-40">
      <Head>
        <title>Login - Mango</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            className="rounded-full border border-transparent bg-[#1db954] py-4 px-6 text-xs font-bold uppercase tracking-wider text-white transition duration-300 ease-out hover:scale-105 hover:bg-[#0db146] md:text-base"
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Signin

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
