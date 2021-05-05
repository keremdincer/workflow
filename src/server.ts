import { ApolloServer } from 'apollo-server'
import { context } from './context'
import { schema } from './schema'

const server = new ApolloServer({
  schema: schema,
  context: context,
  mocks: true
})

server.listen().then(() => {
  console.log(`
    🚀 Server running on port 4000
  `)
})