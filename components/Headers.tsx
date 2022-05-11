import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'
import Nav from './NavBar/Nav'
export default function Header() {
  const { data: session } = useSession()

  return (
    <header>
      <Nav />
      <div>
        <p>
          {!session && (
            <>
              <span>You are not signed in</span>
              <a
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <Image
                  src={session.user.image}
                  width={50}
                  height={50}
                  alt="user image"
                />
              )}
              <div className="px-4">
                <small>Signed in as</small>
                <br />
                <strong>
                  {session.user.email} {session.user.name}
                </strong>
              </div>
              <a
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/users/me">
              <a>Me</a>
            </Link>
          </li>
        </ul>
      </nav>
     
    </header>
  )
}
