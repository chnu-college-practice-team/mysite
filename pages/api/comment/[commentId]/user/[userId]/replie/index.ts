import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    handlePOST(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// POST /api/comment/:commentId/user/:userId/replie/ 
async function handlePOST(req, res) {
  const { commentId, userId } = req.query
  const { text } = req.body

  const result = await prisma.replie.create({
    data: {
      text: text + '',
      comment: {
        connect: {
          id: commentId + '',
        },
      },
      user: {
        connect: {
          id: userId + '',
        },
      },
    },
  })
  res.json(result)
}
