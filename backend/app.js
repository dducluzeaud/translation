import { ApolloServer } from 'apollo-server'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import graphQlResolvers from './graphql/resolvers'
import graphQlSchema from './graphql/schemas'
import jwt from 'jsonwebtoken'

dotenv.config()

const server = new ApolloServer({
  cors: {
    allowedHeaders: '*',
  },
  typeDefs: graphQlSchema,
  resolvers: graphQlResolvers,
  introspection: true,
  playground: true,
})

const connectAndLaunch = async () => {
  try {
    mongoose.set('useUnifiedTopology', true)
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-mlmqu.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    )
    const port = 5000
    await server.listen(port)
    console.log(`🚀 server launched on port: ${port}`)
  } catch (error) {
    console.error(error)
  }
}

connectAndLaunch()
