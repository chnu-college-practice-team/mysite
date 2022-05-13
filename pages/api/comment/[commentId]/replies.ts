import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { commentId } = req.query

  const result = await prisma.replie.findMany({
    where: {
      comment: {
        id: commentId + '',
      },
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
    },
  })
  return res.json({ replies: result })
}
