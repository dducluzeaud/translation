import { gql } from 'apollo-server'

const typedefs = gql`
  type Message {
    message: String
  }

  type User {
    _id: ID!
    email: String!
    password: String
    role: String
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    role: Role
  }

  enum Role {
    user
    developer
  }

  input UserInput {
    email: String!
    password: String!
    role: Role
  }

  type Query {
    login(email: String!, password: String!): AuthData!
  }

  type Mutation {
    createUser(userInput: UserInput): User
    uploadTranslations(value: Upload!): Message
  }
`

export default typedefs
