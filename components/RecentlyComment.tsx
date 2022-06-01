import Image from 'next/image'
import Link from 'next/link'
import type { Comment } from 'lib/types'

export default function RecentlyComment({ comment }: { comment: Comment }) {
  return (
    <div className="flex items-center space-x-3">
      <Image
        src={comment.user.image}
        alt=""
        width={52}
        height={52}
        className="h-[52px] w-[52px] rounded-full"
      />
      <div>
        <Link href={`/users/${comment.user.id}`}>
          <p className="cursor-pointer text-xs font-semibold text-[#686868] hover:underline">
            {comment.user.name}
          </p>
        </Link>
        <h4 className="mb-0.5 max-w-[150px] cursor-pointer truncate text-[13px] font-semibold text-white">
          {comment.text}
        </h4>
      </div>
    </div>
  )
}
