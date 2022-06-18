import Image from 'next/image'
import type { Manga } from '@prisma/client'

function Card({ manga }: {manga: Manga}) {
  return (
    <div
      className="w-[260px] h-[360px] rounded-[50px] overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group mx-auto"
    >
      <Image src={manga.image} alt="" layout="fill"
        className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-80 group-hover:opacity-100"
      />

      <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5">
        <div className="text-[15px]">
          <h4 className="font-extrabold truncate w-44">{manga.title}</h4>
          <h6>{manga.author}</h6>
        </div>
      </div>
    </div>
  );
}

export default Card;
