import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import type { User } from '@prisma/client'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) {
  const userId = req.query.id.toString()
  if (req.method === 'GET') {
    handleGET(userId, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/user/:id
async function handleGET(postId: string, res: NextApiResponse<User | null>) {
  const user = await prisma.user.findUnique({
    where: {
      id: postId,
    },
  })
  res.json(user)
}
