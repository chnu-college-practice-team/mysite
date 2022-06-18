import { Dispatch, useState, SetStateAction } from 'react'
import type { Session } from 'next-auth'
import { pushToSupabase } from 'lib/pushToSupabase'

type Props = {
  user: Session['user']
  setOpened?: Dispatch<SetStateAction<boolean>>
}

export default function EditForm({ user, setOpened }: Props) {
  const [name, setName] = useState(user.name)
  const [avatarFile, setAvatarFile] = useState<File | null>()

  const onSubmit = async () => {
    const image = await pushToSupabase(user.id, avatarFile, "avatars")
    fetch(`/api/user/${user.id}`, {
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }, body: JSON.stringify({ name, image }),
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
          type="file"
          accept="image/png, image/jpeg, image/gif"
          onChange={(e) => setAvatarFile(e.target.files[0])}
          name="avatar"
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

