import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import type { Comment } from '@prisma/client'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Comment>
) {
  const userId = req.query.id.toString()
  const { text } = req.body
  console.log({ text, userId })

  const result = await prisma.comment.create({
    data: {
      text: text + '',
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })
  res.json(result)
}
