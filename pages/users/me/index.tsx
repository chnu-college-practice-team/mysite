import { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import EditForm from 'components/EditForm'
import useRequireAuth from 'lib/useRequireAuth'
import Layout from 'components/Layout'

const MePage: NextPage = () => {
  const [isChange, setIsChange] = useState(false)
  const session = useRequireAuth()

  return (
    <Layout>
      <div className="flex flex-wrap">
        {session.user.image && (
          <Image
            src={session.user.image}
            width={50}
            height={50}
            alt="user image"
          />
        )}
        <div className="mx-2 flex flex-col flex-wrap">
          <span>{session.user.name}</span>
          <span>{session.user.email}</span>
        </div>
      </div>
      <button
        disabled={isChange}
        hidden={isChange}
        className="focus:shadow-outline w-1/6 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        onClick={() => setIsChange(true)}
      >
        Change
      </button>
      {isChange && <EditForm setOpened={setIsChange} user={session.user} />}
    </Layout>
  )
}

export default MePage
