import { Context } from '../../context'

export default {
  Query: {
    corporations: (_parent, _args, context: Context) =>
      context.prisma.corporation.findMany(),

    corporation: (_parent, { id }, context: Context) =>
      context.prisma.corporation.findUnique({
        where: { id },
      }),

    branch: (_parent, { id }, context: Context) =>
      context.prisma.branch.findUnique({
        where: { id },
      }),
  },

  Project: {
    corporations: (parent, _args, context: Context) =>
      context.prisma.corporation.findUnique({
        where: {
          id: parent.id,
        },
      }),
  },

  Corporation: {
    branches: (parent, _args, context: Context) =>
      context.prisma.branch.findMany({
        where: { corporationId: parent.id },
      }),
  },

  Branch: {
    corporation: (parent, _args, context: Context) =>
      context.prisma.corporation.findUnique({
        where: { id: parent.corporationId },
      }),
  },

  Mutation: {
    createCorporation: (_parent, { name }, context: Context) =>
      context.prisma.corporation.create({
        data: { name },
      }),

    updateCorporation: (_parent, { id, name }, context: Context) =>
      context.prisma.corporation.update({
        where: { id },
        data: { name },
      }),

    deleteCorporation: (_parent, { id }, context: Context) =>
      context.prisma.corporation.delete({
        where: { id },
      }),

    createBranch: (_parent, { data }, context: Context) =>
      context.prisma.branch.create({
        data,
      }),

    updateBranch: (_parent, { id, data }, context: Context) =>
      context.prisma.branch.update({
        where: { id: id },
        data: data,
      }),

    deleteBranch: (_parent, { id }, context: Context) =>
      context.prisma.branch.delete({
        where: { id },
      }),
  },
}
