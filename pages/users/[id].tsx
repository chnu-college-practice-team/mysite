import Header from '../../components/Headers'
import Image from 'next/image'
import { GetServerSideProps, NextPage } from 'next'
import type { User } from '@prisma/client'

const UserPage: NextPage<{ user: User }> = ({ user }) => {
  return (
    <>
      <Header />
      <div className="flex flex-wrap">
        <Image src={user.image} alt="profile" width={96} height={96} />
        <div className='mx-2 flex flex-wrap flex-col'>
          <span>{user.name}</span>
          <span>{user.email}</span>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `http://localhost:3000/api/user/${context.params?.id}`,
    {
      method: 'GET',
    }
  )
  const user = await res.json()

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user,
    },
  }
}

export default UserPage
