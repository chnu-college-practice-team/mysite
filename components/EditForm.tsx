import { Dispatch, FormEvent, useState, SetStateAction } from 'react'
import type { Session } from 'next-auth'

type Props = {
  user: Session["user"]
  setOpened?: Dispatch<SetStateAction<boolean>>
}

export default function EditForm({ user, setOpened }: Props) {
  const [name, setName] = useState(user.name)
  const [image, setImage] = useState(user.image)

  const onSubmit = () => {
    fetch(`http://localhost:3000/api/user/${user.id}`, {
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, image }),
    })

    setOpened(false)
  }

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
            onSubmit()
          }}
        >
          Submit New Data
        </button>
      </form>
    </div>
  )
}
