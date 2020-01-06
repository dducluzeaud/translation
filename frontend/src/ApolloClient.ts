import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'

const link = createUploadLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'same-origin',
})

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false,
  }),
})
