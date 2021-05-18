import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'

const prisma = new PrismaClient()

interface CurrentUser {
  id: number
  email: string
  roles: string[]
}

export interface Context {
  prisma: PrismaClient
  currentUser: { email: string, id: number } | null
}

export const context = async ({ req }) => {
  const token = req.headers.authorization || ''

  let currentUser: CurrentUser | null = null

  try {
    currentUser = verify(token.replace('Bearer ', ''), process.env.JWT_SECRET!) as CurrentUser

    // Add user roles
    currentUser.roles = (await prisma.role.findMany({
      where: {
        users: {
          some: {
            email: currentUser.email
          }
        }
      },
      select: {
        label: true
      }
    })).map(r => r.label)
  }
  catch (err) {
    // Invalid token, Expired token, No token provided, etc
  }

  return {
    prisma,
    currentUser
  } as Context
}