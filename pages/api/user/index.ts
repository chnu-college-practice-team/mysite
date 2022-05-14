import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import type { User } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ users: User[] }>
) {
  if (req.method === "GET") {
    handleGET(res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/user/
async function handleGET(
  res: NextApiResponse<{ users: User[] }>
) {
  const users = await prisma.user.findMany({})  
  return res.status(200).json({ users })
}
