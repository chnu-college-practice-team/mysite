import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import type { Manga } from '@prisma/client'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Manga>
) {
  if (req.method === 'POST') {
    handlePOST(req, res)
  } else if (req.method === 'GET') {
    handleGET(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// POST /api/manga/
async function handlePOST(req: NextApiRequest, res: NextApiResponse<Manga>) {
  const data = req.body
  const result = await prisma.manga.create({
    data: {
      ...data,
    },
  })
  res.json(result)
}

// Get /api/manga

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  
  const mangas = await prisma.manga.findMany({})

  return res.status(200).json({mangas})

}