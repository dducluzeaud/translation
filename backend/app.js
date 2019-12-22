import { ApolloServer } from 'apollo-server'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import graphQlResolvers from './graphql/resolvers'
import graphQlSchema from './graphql/schemas'
import jwt from 'jsonwebtoken'

dotenv.config()

const server = new ApolloServer({
  typeDefs: graphQlSchema,
  resolvers: graphQlResolvers,
  context: async ({ req }) => {
    // get the user token from the headers
    // remove Bearer from token
    const token = req.headers.authorization.split(' ')[1] || null

    if (token) {
      const ver = jwt.verify(token, process.env.SECRET_KEY_JWT)
      // try to retrieve a user with the token
      const user = jwt.decode(token)
      return { user }
    }

    return null
    // add the user to the context
  },
  introspection: true,
  playground: true,
})

const connectAndLaunch = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-mlmqu.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    )
    const port = 5000
    await server.listen(port)
    console.log(`🚀 server launched on port: ${port}`)
  } catch (error) {
    console.error(error)
  }
}

connectAndLaunch()
