import { useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'

export default function CommentForm() {
  const [text, setText] = useState('')
  const { data } = useSession()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    fetch(`/api/user/${data?.user?.id}/comment`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })

    setText('')
  }

  return (
    data?.user && (
      <form onSubmit={(e) => onSubmit(e)} className="mx-auto w-1/2">
        <div className='flex flex-wrap flex-col'>
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
            className="w-1/2.5 self-end my-3 rounded-lg bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gradient-to-r"
          >
            Send Comment
          </button>
        </div>
      </form>
    )
  )
}
