import { useSession } from 'next-auth/react'
import { Dispatch, FormEvent, useState, SetStateAction } from 'react'

type Props = {
  replied?: boolean
  setOpened?: Dispatch<SetStateAction<boolean>>
  id?: string
}

export default function CommentForm({ replied, id, setOpened }: Props) {
  const [text, setText] = useState('')
  const { data } = useSession()
  const href = replied
    ? `/api/comment/${id}/user/${data?.user?.id}/replie`
    : `/api/user/${data?.user?.id}/comment`

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    fetch(href, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })

    setText('')
    if (replied) {
      setOpened(false)
    }
  }

  return (
    data?.user && (
      <form
        onSubmit={(e) => {
          onSubmit(e)
        }}
        className="mx-auto w-1/2"
      >
        <div className="flex flex-col flex-wrap">
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows={4}
            className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500      focus:ring-blue-500"
            value={text}
            placeholder="Your message..."
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            disabled={!text}
            type="submit"
            className="w-1/2.5 my-3 self-end rounded-lg bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gradient-to-r"
          >
            {replied ? "Send Reply" : "Send Comment"}
          </button>
        </div>
      </form>
    )
  )
}
