import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Header from '../../../components/Headers'
import Image from 'next/image'
import { useState, Dispatch,SetStateAction } from 'react'


const MePage: NextPage = () => {

const ChangeForm = () => {
  const Change = () => { 
    console.log('change', JSON.stringify({ name, image }))
    console.log('id', data.user.id)
    fetch(`http://localhost:3000/api/user/${data.user.id}`, {
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, image }),
    })
  }
  const [name, setName] = useState(data.user.name)
  const [image, setImage] = useState(data.user.image)

  return (
    <div>
      <form className="flex">
        <label htmlFor="name">New name </label>
        <input
          className="focus:shadow-outline w-1/6 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
        />
        <label htmlFor="image">New image </label>
        <input
          className="focus:shadow-outline w-1/6 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          name="image"
        />
        <button
          className="focus:shadow-outline w-1/6 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          type="button"
          onClick={() => {
            Change()
            setIsChange(false)
          }}
        >Submit New Data</button>
      </form>
    </div>
  )
}


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
            <ChangeForm/>
          )}
        </>
      )}
    </>
  )
}

export default MePage
