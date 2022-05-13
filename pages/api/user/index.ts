import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import type { User } from '@prisma/client'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{ users: User[] }>
) {
  const users = await prisma.user.findMany({})
  return res.status(200).json({ users })
}
