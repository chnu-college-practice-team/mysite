import { useData } from 'context/useData'
import Card from './Card'
import CommandPalette from './CommandPalette'

export default function Body() {
  const { mangas } = useData()

  return (
    <section className="ml-24 flex-grow space-y-8 bg-black py-4 md:mr-2.5 md:max-w-6xl">
      <CommandPalette />
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
        {mangas.map((manga) => (
          <Card key={manga.id} manga={manga} />
        ))}
      </div>
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
