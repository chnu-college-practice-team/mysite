import { useSession } from 'next-auth/react'
import CommandPalette from './CommandPalette'

export default function Body() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <section className="ml-24 flex-grow space-y-8 bg-black py-4 md:mr-2.5 md:max-w-6xl">
      <CommandPalette />
      <div className="absolute ml-6 flex min-w-full gap-x-8 md:relative">
        <div className="hidden max-w-[270px] xl:inline">
          <h2 className="mb-3 font-bold text-white">Genres</h2>
          <div className="mb-3 flex flex-wrap gap-x-2 gap-y-2.5">
            {/* genres */}
          </div>
          <button className="btn">All Genres</button>
        </div>
      </div>
    </section>
  )
}
