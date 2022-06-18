import Dropdown from './Dropdown'
import Link from 'next/link'
import { useData } from 'context/useData'
import RecentlyComment from './RecentlyComment'

export default function Right() {
  const { comments } = useData()

  return (
    <section className="space-y-8 p-4 pr-8">
      <div className="flex items-center justify-between space-x-2">
        {/* Profile */}
        <Dropdown />
      </div>

      <div className="space-y-4 rounded-xl border-2 border-[#262626] bg-[#0d0d0d] p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">Recently Comments</h4>
        </div>

        <div className="h-[250px] space-y-4 overflow-x-hidden overflow-y-scroll md:h-[400px]">
          {comments.slice(0, 7).map((comment) => (
            <RecentlyComment key={comment.id} comment={comment} />
          ))}
        </div>
        <Link href="/forum">
          <button className="btn">View All</button>
        </Link>
      </div>
    </section>
  )
}
