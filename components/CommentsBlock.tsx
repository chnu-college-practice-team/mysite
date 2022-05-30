import Image from 'next/image'
import CommentForm from './CommentForm'
import { useState } from 'react'
import Link from 'next/link'
import type { Reply } from 'lib/types'
import { useData } from 'context/useData'
import type { Comment } from 'lib/types'

export default function CommentsBlock() {
  const { comments } = useData()
  return (
    <section className="min-w-screen relative flex items-center justify-center  bg-gray-100 antialiased">
      <div className="container mx-auto px-0 sm:px-5">
        {comments &&
          comments.map((comment) => (
            <Comment key={comment.id} data={comment} />
          ))}
      </div>
    </section>
  )
}

const Comment = ({ data }: { data: Comment }) => {
  const [opened, setOpened] = useState(false)

  const prettyTime = new Date(data.updatedAt).toLocaleTimeString('uk-UA', {
    timeStyle: 'short',
  })

  const toggle = () => setOpened(!opened)

  return (
    <div className="mx-auto w-full flex-col border-b-2 border-r-2 border-gray-200 bg-white py-4 sm:rounded-lg sm:px-4 sm:py-4 sm:shadow-sm md:w-2/3 md:px-4">
      <div className="flex flex-row">
        <Link href={`/users/${data.user.id}`}>
          <Image
            src={data.user.image}
            layout="fixed"
            width={64}
            height={64}
            alt="profile photo"
            className="rounded-full border-2 border-gray-300 object-cover"
          />
        </Link>
        <div className="mt-1 flex-col">
          <div className="flex flex-1 items-center px-4 font-bold leading-tight">
            <span className="bg-gradient-to-b from-[#0057b7] to-[#ffd700] bg-clip-text text-transparent">
              <Link href={`/users/${data.user.id}`}>{data.user.name}</Link>
            </span>
            <span className="ml-2 text-xs font-normal text-gray-500">
              {prettyTime}
            </span>
          </div>
          <div className="ml-2 flex-1 px-2 text-sm font-medium leading-loose text-black">
            {data.text}
          </div>
          <button
            className="flex-column ml-1 inline-flex items-center px-1 pt-2"
            onClick={toggle}
          >
            <svg
              className="ml-2 h-5 w-5 cursor-pointer fill-current text-gray-600 hover:text-gray-900"
              viewBox="0 0 95 78"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.58 0c1.53.064 2.88 1.47 2.879 3v11.31c19.841.769 34.384 8.902 41.247 20.464 7.212 12.15 5.505 27.83-6.384 40.273-.987 1.088-2.82 1.274-4.005.405-1.186-.868-1.559-2.67-.814-3.936 4.986-9.075 2.985-18.092-3.13-24.214-5.775-5.78-15.377-8.782-26.914-5.53V53.99c-.01 1.167-.769 2.294-1.848 2.744-1.08.45-2.416.195-3.253-.62L.85 30.119c-1.146-1.124-1.131-3.205.032-4.312L27.389.812c.703-.579 1.49-.703 2.19-.812zm-3.13 9.935L7.297 27.994l19.153 18.84v-7.342c-.002-1.244.856-2.442 2.034-2.844 14.307-4.882 27.323-1.394 35.145 6.437 3.985 3.989 6.581 9.143 7.355 14.715 2.14-6.959 1.157-13.902-2.441-19.964-5.89-9.92-19.251-17.684-39.089-17.684-1.573 0-3.004-1.429-3.004-3V9.936z"
                fillRule="nonzero"
              />
            </svg>
          </button>
        </div>
      </div>
      {opened && <CommentForm replied id={data.id} setOpened={setOpened} />}
      {data.replies &&
        data.replies.map((reply) => <Reply data={reply} key={reply.id} />)}
    </div>
  )
}

const Reply = ({ data }: { data: Reply }) => {
  const prettyTime = new Date(data.updatedAt).toLocaleTimeString('uk-UA', {
    timeStyle: 'short',
  })

  return (
    <>
      <div className="md-10 my-3 flex flex-row pt-1 md:ml-16">
        <Link href={`/users/${data.user.id}`}>
          <Image
            src={data.user.image}
            layout="fixed"
            width={48}
            height={48}
            alt="profile photo"
            className="rounded-full border-2 border-gray-300 object-cover"
          />
        </Link>
        <div className="mt-1 flex-col">
          <div className="flex flex-1 items-center px-4 font-bold leading-tight">
            <span className="bg-gradient-to-b from-[#0057b7] to-[#ffd700] bg-clip-text text-transparent">
              <Link href={`/users/${data.user.id}`}>{data.user.name}</Link>
            </span>
            <span className="ml-2 text-xs font-normal text-gray-500">
              {prettyTime}
            </span>
          </div>
          <div className="ml-2 flex-1 px-2 text-sm font-medium leading-loose text-black">
            {data.text}
          </div>
        </div>
      </div>
    </>
  )
}
