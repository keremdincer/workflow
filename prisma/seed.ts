import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL!,
      password: await hash(process.env.ADMIN_PASSWORD!, 4),
      firstName: 'admin',
      lastName: 'admin',
      roles: {
        create: {
          label: 'ADMIN',
        },
      },
    },
  })

  const userRole = await prisma.role.create({
    data: {
      label: 'USER',
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
