import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import type { Comment } from '@prisma/client'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const commentId = req.query.id
  if (req.method === 'GET') {
    handleGET(commentId, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

//GET /api/comment/:id
async function handleGET(commentId, res) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    select: {
      id: true,
      text: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      replies: true,
    },
  })
  res.json(comment)
}
