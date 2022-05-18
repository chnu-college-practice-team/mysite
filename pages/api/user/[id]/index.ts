import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    handleGET(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/user/:id
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const user = await prisma.user.findUnique({
    where: {
      id: id + '',
    },
  })
  return res.json(user)
}
