import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import type { Genre } from '@prisma/client'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Genre>
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

// POST /api/manga/genre/
async function handlePOST(req: NextApiRequest, res: NextApiResponse<Genre>) {
  const data = req.body
  const result = await prisma.genre.create({
      data: {
        ...data
    }
  })
  res.json(result)
}

// Get /api/manga/genre

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  
  const genres = await prisma.genre.findMany({})

  return res.status(200).json({genres})

}