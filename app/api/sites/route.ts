// /api/sites

import { PrismaClient, SiteType } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const sites = await prisma.site.findMany()
  return Response.json({ sites });
}


export async function POST(request: Request) {
  const params = await request.json()
  console.log(params)
  params.imageExtent = {
    sw: { x: 0, y: 0 },
    ne: { x: 1, y: 1 },
  }

  const site = await prisma.site.create({
    data: params
  })

  return Response.json({ site })
}

