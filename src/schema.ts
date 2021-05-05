import { gql, makeExecutableSchema } from 'apollo-server'

const typeDefs = gql`
  type Query {
    users: [User]
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
  }
`

const resolvers = {
  Query: {
  }
}

export const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})