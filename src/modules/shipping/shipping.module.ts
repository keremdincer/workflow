import { createModule } from 'graphql-modules'
import * as typeDefs from './shipping.graphql'
import resolvers from './shipping.resolvers'

export const shippingModule = createModule({
  id: 'shipping-module',
  dirname: __dirname,
  typeDefs: [typeDefs],
  resolvers,
})
