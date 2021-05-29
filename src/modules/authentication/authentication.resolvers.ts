import { AuthenticationError, UserInputError } from 'apollo-server-errors'
import { compare, hash } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
import { Context } from '../../context'

export default {
  Query: {
    me: (_parent, _args, context: Context) =>
      context.prisma.user.findUnique({
        where: {
          email: context.currentUser?.email,
        },
      }),
  },

  Mutation: {
    login: async (_parent, { email, password }, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: { email: email },
      })

      if (!user) {
        throw new UserInputError('Kullanıcı adı ya da şifre yanlış.')
      }

      if (await compare(password, user.password)) {
        return {
          accessToken: sign(
            {
              id: user.id,
              email: user.email,
            },
            process.env.JWT_SECRET!,
            {
              expiresIn: '15m',
            }
          ),
          refreshToken: sign(
            {
              id: user.id,
              signature: user.signature,
            },
            process.env.JWT_SECRET!,
            {
              expiresIn: '1d',
            }
          ),
        }
      } else {
        throw new UserInputError('Kullanıcı adı ya da şifre yanlış.')
      }
    },

    register: async (_parent, { data }, context: Context) => {
      const { email, password, firstName, lastName } = data

      const user = await context.prisma.user.create({
        data: {
          email,
          password: await hash(password, 4),
          firstName,
          lastName,
        },
      })

      return user
    },

    refresh: async (_parent, { token }, context: Context) => {
      let userData
      try {
        userData = verify(token, process.env.JWT_SECRET!)
      } catch {
        throw new AuthenticationError('Refresh token expired/malformed')
      }

      const user = await context.prisma.user.findUnique({
        where: {
          id: userData.id,
        },
      })

      if (!user) {
        return new UserInputError('User not found.')
      }

      if (userData.signature !== user.signature) {
        return new AuthenticationError('Refresh token is invalid')
      }

      return {
        accessToken: sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET!,
          {
            expiresIn: '15m',
          }
        ),
        refreshToken: sign(
          {
            id: user.id,
            signature: user.signature,
          },
          process.env.JWT_SECRET!,
          {
            expiresIn: '1d',
          }
        ),
      }
    },
  },
}
