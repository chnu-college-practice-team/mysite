import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import type { Comment } from '@prisma/client'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Comment>
) {
  if (req.method === "POST") {
    handlePOST(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// POST /api/user/:id/comment
async function handlePOST(
  req: NextApiRequest,
  res: NextApiResponse<Comment>
) {
  const { id } = req.query; 
  const { text } = req.body

  const result = await prisma.comment.create({
    data: {
      text: text + '',
      user: {
        connect: {
          id: id + '',
        },
      },
    },
  })
  res.json(result)
}