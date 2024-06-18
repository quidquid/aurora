import { PrismaClient, LightType } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const lights = await prisma.light.findMany()
  return Response.json({ lights });
}


export async function POST(request: Request) {
  const params = await request.json()
  console.log(params)

  const light = await prisma.light.create({
    data: params
  })

  return Response.json({ light })
}