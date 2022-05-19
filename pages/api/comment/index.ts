import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    handleGET(res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/comments/
async function handleGET(res: NextApiResponse) {
  const comments = await prisma.comment.findMany({
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      replies: {
        select: {
          id: true,
          text: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
      text: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
  return res.status(200).json({ comments })
}
