import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import type { Genre } from '@prisma/client'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Genre>
) {
  if (req.method === 'GET') {
    handleGET(req, res)
  } else if (req.method === 'DELETE') {
    handleDELETE(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// Get /api/manga/genre/[id]
async function handleGET(req: NextApiRequest, res: NextApiResponse<Genre>) {
  const { id } = req.query
  const genre = await prisma.genre.findUnique({
    where: {
      id: id + '',
    },
  })
  return res.json(genre)
}

//Delete /api/manga/genre/[id]

async function handleDELETE(req: NextApiRequest, res: NextApiResponse<Genre>) {
  const { id } = req.query
  const genre = await prisma.genre.delete({
    where: {
      id: id + '',
    },
  })
  res.json(genre)
}
