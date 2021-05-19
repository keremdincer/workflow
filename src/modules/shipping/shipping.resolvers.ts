import { Context } from '../../context'

interface ExportItem {
  itemTypeId: number
  itemCount: number
}

interface CreateExportInput {
  data: {
    reservationNo: number
    type: string
    branchId: number
    items: ExportItem[]
  }
}

export default {
  Branch: {
    exports: (parent, _args, context: Context) =>
      context.prisma.export.findMany({
        where: {
          branchId: parent.id,
        },
      }),
  },

  Query: {
    exports: (_parent, _args, context: Context) =>
      context.prisma.export.findMany(),

    export: (_parent, { id }, context: Context) =>
      context.prisma.export.findUnique({ where: { id } }),

    exportsByReservation: (_parent, { reservationNo }, context: Context) =>
      context.prisma.export.findMany({ where: { reservationNo } }),

    shippings: (_parent, _args, context: Context) =>
      context.prisma.shipping.findMany(),

    shipping: (_parent, { id }, context: Context) =>
      context.prisma.shipping.findUnique({ where: { id } }),
  },

  Mutation: {
    createExport: async (
      _parent,
      { data }: CreateExportInput,
      context: Context
    ) => {
      const items: { itemTypeId: number }[] = []
      data.items.forEach((item) => {
        for (let i = 0; i < item.itemCount; i++) {
          items.push({ itemTypeId: item.itemTypeId })
        }
      })

      const { reservationNo, branchId, type } = data
      return context.prisma.export.create({
        data: {
          reservationNo,
          branchId,
          type,
          items: {
            create: items,
          },
        },
      })
    },

    updateExport: (_parent, { id, type, branchId }, context: Context) =>
      context.prisma.export.update({
        where: { id },
        data: { type, branchId },
      }),

    // TODO: CASCADE?
    deleteExport: (_parent, { id }, context: Context) =>
      context.prisma.export.delete({ where: { id } }),
  },
}
