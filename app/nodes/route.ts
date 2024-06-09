import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const nodes = await prisma.node.findMany()
  return Response.json({ nodes });
}
