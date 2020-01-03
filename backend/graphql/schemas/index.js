import { gql } from 'apollo-server'

const typedefs = gql`
  type Message {
    message: String
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
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

  type Language {
    en: String
    fr: String
  }

  type Translation {
    traduction_key: String!
    created_at: String!
    url: String
    languages: Language
    updated: Boolean
    project: String
  }

  type Query {
    login(email: String!, password: String!): AuthData!
    getTranslation(project: String!): [Translation]!
  }

  type Mutation {
    createUser(userInput: UserInput): User
    uploadTranslations(value: Upload!): Message
    uploadFile(file: Upload!): File!
  }
`

export default typedefs
