import { Context } from '../../context'

export default {
  Query: {
    users: (_parent, _args, context: Context) => context.prisma.user.findMany(),

    user: (_parent, { id }, context: Context) =>
      context.prisma.user.findUnique({
        where: {
          id,
        },
      }),

    roles: (_parent, _args, context: Context) => context.prisma.role.findMany(),

    role: (_parent, { id }, context: Context) =>
      context.prisma.role.findUnique({
        where: {
          id,
        },
      }),
  },

  User: {
    roles: (parent, _args, context: Context) =>
      context.prisma.role.findMany({
        where: {
          users: {
            some: {
              id: parent.id,
            },
          },
        },
      }),

    contacts: (parent, _args, context: Context) =>
      context.prisma.contact.findMany({
        where: { userId: parent.id },
      }),
  },

  Mutation: {
    assignRole: async (_parent, { roleId, userId }, context: Context) => {
      await context.prisma.user.update({
        where: { id: userId },
        data: {
          roles: {
            connect: {
              id: roleId,
            },
          },
        },
      })

      return true
    },

    revokeRole: async (_parent, { roleId, userId }, context: Context) => {
      await context.prisma.user.update({
        where: { id: userId },
        data: {
          roles: {
            disconnect: {
              id: roleId,
            },
          },
        },
      })

      return true
    },
  },
}
