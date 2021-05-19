import { createModule, gql } from "graphql-modules";
import * as typeDefs from './corporation.graphql'
import resolvers from './corporation.resolvers'

export const corporationModule = createModule({
  id: 'corporation-module',
  dirname: __dirname,
  typeDefs: [typeDefs],
  resolvers
})