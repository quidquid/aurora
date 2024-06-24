import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient().$extends({
  name: 'models',  // (optional) names the extension for error logs
  model: {
    node: {
      async thing(email: string) {
        //await prisma.user.create({ data: { email } })
      },
    }
  },
});

export default prisma;