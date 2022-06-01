import Image from 'next/image'

type Manga = {
  imageUrl: string
  title: string
  slug: string
}

export default function Poster({ manga }: { manga: Manga }) {
  return (
    <div className="group relative mx-auto h-[360px] w-[260px] cursor-pointer overflow-hidden rounded-[50px] text-white/80 transition duration-200 ease-out hover:scale-105 hover:text-white/100">
      <Image
        src={manga.imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full rounded-[50px] object-cover opacity-80 group-hover:opacity-100"
      />

      <div className="absolute inset-x-0 bottom-10 ml-4 flex items-center space-x-3.5">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#15883e] group-hover:bg-[#1db954]"></div>

        <div className="text-[15px]">
          <h4 className="w-44 truncate font-extrabold">{manga.title}</h4>
        </div>
      </div>
    </div>
  )
}
