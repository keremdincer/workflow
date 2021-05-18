import 'graphql-import-node'
import { ApolloServer } from 'apollo-server'
import { schema } from './application'
import { context } from './context'

const server = new ApolloServer({
  schema: schema,
  context: context
})

server.listen().then(() => {
  console.log(`
    🚀 Server running on port 4000
  `)
})