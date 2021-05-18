import { createModule, gql } from "graphql-modules";
import * as typeDefs from './authentication.graphql'
import resolvers from './authentication.resolvers'

export const authenticationModule = createModule({
  id: 'authentication-module',
  dirname: __dirname,
  typeDefs: [typeDefs],
  resolvers
})