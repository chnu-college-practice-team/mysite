import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
