import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Header from '../../../components/Headers'
import Image from 'next/image'
import { useState } from 'react'
import EditForm from 'components/EditForm'


const MePage: NextPage = () => {
  const [isChange, setIsChange] = useState(false)
  const { data } = useSession()

  return (
    <>
      <Header />
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {data?.user && (
        <>
          <div className="flex flex-wrap">
            {data.user.image && (
              <Image
                src={data.user.image}
                width={50}
                height={50}
                alt="user image"
              />
            )}
            <div className="mx-2 flex flex-col flex-wrap">
              <span>{data.user.name}</span>
              <span>{data.user.email}</span>
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
          {isChange && (
            <EditForm setOpened={setIsChange} user={data.user}/>
          )}
        </>
      )}
    </>
  )
}

export default MePage
