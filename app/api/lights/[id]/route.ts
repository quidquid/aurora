// /api/lights/[id]

import { PrismaClient, LightType } from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const light = await prisma.light.findFirst({
    where: { id: params.id }
  })
  return Response.json({ light });
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const light = await prisma.light.delete({
    where: { id: params.id }
  })
  return Response.json({ ok: true, deleted: params.id })
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json()
  await prisma.light.update({
    where: { id: params.id },
    data: data
  })

  const light = await prisma.light.findFirst({
    where: { id: params.id }
  })

  return Response.json({ light })
}