import { gql, makeExecutableSchema, UserInputError } from 'apollo-server'
import { DateTimeResolver } from 'graphql-scalars'
import { ZodError } from 'zod'
import { Context } from './context'
import { Password } from './services/password'
import { Token } from './services/token'
import { loginValidator, registerValidator } from './validators/user'

const typeDefs = gql`
  type Mutation {
    registerUser(input: UserCreateInput!): User!
    loginUser(input: UserLoginInput!): UserLoginPayload!
    refreshToken(token: String!): RefreshToken!
  }

  type Query {
    users: [User]
    me: User!
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    createdAt: DateTime!
  }

  type RefreshToken {
    id: ID!
    expiresAt: DateTime!
  }

  input UserCreateInput {
    email: String!
    password: String!
    confirm: String!
    firstName: String!
    lastName: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type UserLoginPayload {
    accessToken: String!
    refreshToken: String!
  }

  scalar DateTime
`

const resolvers = {
  Query: {
    me: async (_parent, args, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: {
          email: context.currentUser?.email
        }
      })

      return user
    }
  },
  Mutation: {
    registerUser: async (_parent, args: { input: UserCreateInput }, context: Context) => {
      try {
        const result = registerValidator.parse(args.input)

        const user = await context.prisma.user.create({
          data: {
            email: result.email,
            password: await Password.toHash(result.password),
            firstName: result.firstName,
            lastName: result.lastName
          }
        })

        return user
      } catch (err) {
        throw new UserInputError("One or more required fields are missing.")
      }
    },

    loginUser: async (_parent, args: { input: UserLoginInput }, context: Context) => {
      const result = loginValidator.parse(args.input)

      const user = await context.prisma.user.findUnique({
        where: { email: result.email }
      })

      if (!user) {
        throw new UserInputError("User not found.")
      }

      try {
        const success = await Password.compare(user.password, result.password)
        if (success) {
          return { accessToken: Token.generate(user), refreshToken: 'refresh' } as UserLoginPayload
        }
      } catch (err) {
        throw new UserInputError("Email and/or password mismatch.")
      }
    },

  },
  DateTime: DateTimeResolver
}

interface UserLoginPayload {
  accessToken: string
  refreshToken: string
}

interface UserLoginInput {
  email: string
  password: string
}

interface UserCreateInput {
  email: string
  password: string
  confirm: string
  firstName: string
  lastName: string
}

export const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})