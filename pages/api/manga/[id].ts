import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import type { Manga } from '@prisma/client'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Manga>
) {
  if (req.method === 'GET') {
    handleGET(req, res)
  } else if (req.method === 'DELETE') {
    handleDELETE(req, res)
  } else if (req.method === 'PUT') {
    handlePUT(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// Get /api/manga/[id]
async function handleGET(req: NextApiRequest, res: NextApiResponse<Manga>) {
  const { id } = req.query
  const manga = await prisma.manga.findUnique({
    where: {
      id: id + '',
    },
  })
  return res.json(manga)
}

// Delete /api/manga/[id]
async function handleDELETE(req: NextApiRequest, res: NextApiResponse<Manga>) {
  const { id } = req.query
  const manga = await prisma.manga.delete({
    where: {
      id: id + '',
    },
  })
  res.json(manga)
}

//Put /api/manga/[id]
async function handlePUT(req: NextApiRequest, res: NextApiResponse<Manga>) {
  const { id } = req.query
  const data = req.body
  const manga = await prisma.manga.update({
    where: {
      id: id + '',
    },
    data: {
      ...data,
    },
  })
  return res.json(manga)
}
