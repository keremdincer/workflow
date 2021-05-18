import { createModule, gql } from "graphql-modules";
import * as typeDefs from './user.graphql'
import resolvers from './user.resolvers'

export const userModule = createModule({
  id: 'user-module',
  dirname: __dirname,
  typeDefs: [typeDefs],
  resolvers
})