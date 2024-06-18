import { type NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client'
import { fetchJson, postLEDSettings, jsonToAttrs } from '@/lib/wled'

const prisma = new PrismaClient()

// Fetch raw JSON from wled API
async function getNode(id: string) {
  const node = await prisma.node.findFirst({
    where: { id }
   })
  const json = await fetchJson(node.ip)
  console.log(json)
  return json
}


export async function GET(request: Request, { params }: { params: { id: string } }) {
  const json = await getNode(params.id)

  const attrs = jsonToAttrs(json)
  await prisma.node.upsert({
    where: {
      mac: attrs.mac
    },
    update: attrs,
    create: attrs,
  })

  const node = await prisma.node.findFirst({
    where: { mac: node.mac }
  })

  return Response.json({ node });
}


export async function POST(request: Request, { params }: { params: {
    id: string,
    led: object,
    ui: object,
    wifi: object,
  } }) {
  let node = await getNode(params.id)

  if (params.led) {
    const res = await postLEDSettings(node.ip, params.data)
  }
  if (params.ui) {
  }
  if (params.wifi) {
  }

  const json = await fetchJson(node.ip)
  const attrs = jsonToAttrs(json)
  await prisma.node.upsert({
    where: {
      mac: attrs.mac
    },
    update: attrs,
    create: attrs,
  })

  node = await prisma.node.findFirst({
    where: { mac: node.mac }
  })

  return Response.json({ node })
}