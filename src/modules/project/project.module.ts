import { createModule, gql } from "graphql-modules";
import * as typeDefs from './project.graphql'
import resolvers from './project.resolvers'

export const projectModule = createModule({
  id: 'project-module',
  dirname: __dirname,
  typeDefs: [typeDefs],
  resolvers
})