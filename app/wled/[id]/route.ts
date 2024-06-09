import { type NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client'
import { fetchJson } from '@/lib/wled'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const node = await prisma.node.findFirst({
    where: {
      id: params.id
    }
   })
  const data = await fetchJson(node.ip)
  console.log(data)

  // Might want ot update record here

  return Response.json(data);
}
