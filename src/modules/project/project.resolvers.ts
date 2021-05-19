import { Context } from "../../context";

export default {
  Query: {
    projects: (_parent, _args, context: Context) => context.prisma.project.findMany(),

    project: (_parent, { id }, context: Context) => context.prisma.project.findUnique({ where: { id } }),
  },

  Project: {
    users: (_parent, _args, context: Context) => context.prisma.user.findMany({
      where: {
        projects: {
          some: {
            id: _parent.id
          }
        }
      }
    })
  },

  Mutation: {
    createProject: (_parent, { name }, context: Context) =>
      context.prisma.project.create({
        data: { name }
      }),

    updateProject: (_parent, { id, name }, context: Context) =>
      context.prisma.project.update({
        where: { id }, data: { name }
      }),

    deleteProject: (_parent, { id }, context: Context) =>
      context.prisma.project.delete({
        where: { id }
      }),

    assignUserToProject: async (_parent, { userId, projectId }, context: Context) => {
      await context.prisma.project.update({
        where: { id: projectId },
        data: { users: { connect: { id: userId } } }
      })
      return true
    },

    dismissUserFromProject: async (_parent, { userId, projectId }, context: Context) => {
      await context.prisma.project.update({
        where: { id: projectId },
        data: { users: { disconnect: { id: userId } } }
      })
      return true
    }
  }
}