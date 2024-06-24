import { PrismaClient } from '@prisma/client'
import { jsonToAttrs } from '@/lib/wled';


const prisma = new PrismaClient().$extends({
  name: 'models',  // (optional) names the extension for error logs
  model: {  // these will be functions on prisma.node et al, not the results..
    node: {
      /*async thing(email: string) {
        //await prisma.user.create({ data: { email } })
      },*/
    }
  },
  result: { // methods on the query objects
    node: {
      syncToWLED: {
        needs: { id: true, ip: true },
        compute(node) {
          return () => postSettings(node.ip, node.asWLED)
        }
      },
      asWLED: {
        needs: { id: true, ip: true },
        compute(node) {
          // TODO divvy up attributes in the way we post to WLED APIs
          return {}
        }
      }
    }
  }
});

export default prisma;