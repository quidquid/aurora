import Bonjour from 'bonjour-service'
import { PrismaClient } from '@prisma/client'
import wledApi from '@/lib/wled'

const prisma = new PrismaClient()


function discover(ms: number): Object[] {
  return new Promise((resolve) => {
    const instance = new Bonjour();

    let list = [];
    let browser = instance.find({ type: 'wled', protocol: 'tcp' }, function (service) {
      const info = {
        ip: service.addresses?.find((a) => a.match(/^[0-9\.]+$/)),
        name: service.name,
        port: service.port,
        mac: service.txt?.mac,
      }
      console.log(info)
      list.push(info)
    });

    setTimeout(() => {
      browser.stop();
      instance.destroy();
      resolve(list);
    }, ms);
  });
}


export async function GET() {
  const list = await discover(5000);

  const wledNodes = await Promise.all(list.map((info) => {
    // Persist / upsert to Node records
    return wledApi.fetchJson(info.ip)
  }))
  console.log(wledNodes)

  wledNodes.map(async (json) => {
    let attrs = {
      mac:    json.info.mac,
      ip:     json.info.ip,
      name:   json.info.name,
      info:   json.info,
      state:  json.state,
      lastSeen: new Date(),
    }
    await prisma.node.upsert({
      where: {
        mac: attrs.mac
      },
      update: attrs,
      create: attrs,
    })
    return attrs
  })

  const macs = list.map(info => info.mac)
  const nodes = await prisma.node.findMany({
    where: { mac: { in: macs } }
  })

  const data = { wledNodes, nodes };
  return Response.json(data);
}
