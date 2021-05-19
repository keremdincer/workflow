import { Context } from '../../context'

export default {
  Query: {
    items: (_parent, _args, context: Context) => context.prisma.item.findMany(),

    item: (_parent, { id }, context: Context) =>
      context.prisma.item.findUnique({ where: { id } }),

    itemTypes: (_parent, _args, context: Context) =>
      context.prisma.itemType.findMany(),

    itemType: (_parent, { id }, context: Context) =>
      context.prisma.itemType.findUnique({ where: { id } }),
  },

  Item: {
    itemType: (parent, _args, context: Context) =>
      context.prisma.itemType.findUnique({ where: { id: parent.itemTypeId } }),
  },

  Mutation: {
    createItemType: (_parent, { name }, context: Context) =>
      context.prisma.itemType.create({
        data: { name },
      }),

    updateItemType: (_parent, { id, name }, context: Context) =>
      context.prisma.itemType.update({
        where: { id },
        data: { name },
      }),

    deleteItemType: (_parent, { id }, context: Context) =>
      context.prisma.itemType.delete({ where: { id } }),
  },
}
