import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'

const prisma = new PrismaClient()

interface CurrentUser {
  id: number
  email: string
}

export interface Context {
  prisma: PrismaClient
  currentUser: { email: string, id: number } | null
}

export const context = ({ req }) => {
  const token = req.headers.authorization || ''

  let currentUser: CurrentUser | null = null

  try {
    currentUser = verify(token.replace('Bearer ', ''), process.env.JWT_SECRET!) as CurrentUser
  }
  catch (err) {
    // Invalid token, Expired token, No token provided, etc
  }

  return {
    prisma,
    currentUser
  } as Context
}