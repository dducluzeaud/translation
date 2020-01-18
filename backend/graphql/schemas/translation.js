import { gql } from 'apollo-server'

const typedef = gql`
  extend type Query {
    getTranslations: [Translation]!
    searchTranslation(search: String!, language: String): [Translation]!
  }
`

export default typedef
