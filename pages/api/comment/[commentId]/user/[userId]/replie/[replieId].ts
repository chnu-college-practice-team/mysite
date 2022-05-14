import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'


export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    handleDELETE(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// DELETE /api/comment/:commentId/user/:userId/replie/:replieId 
async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
  const { replieId } = req.query;
  const replie = await prisma.replie.delete({
    where: {
      id: replieId + '',
    }
  })
  res.json(replie)
}
