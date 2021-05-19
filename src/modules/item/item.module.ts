import { createModule } from 'graphql-modules'
import * as typeDefs from './item.graphql'
import resolvers from './item.resolvers'

export const itemModule = createModule({
  id: 'item-module',
  dirname: __dirname,
  typeDefs: [typeDefs],
  resolvers,
})
