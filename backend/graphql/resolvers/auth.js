import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../../models/user'

const resolvers = {
  Mutation: {
    createUser: async (_, { userInput }) => {
      const existingUser = await User.findOne({ email: userInput.email })
      if (existingUser) {
        throw new Error('User already exists')
      }
      const hashedPassword = await bcrypt.hash(userInput.password, 12)

      const user = new User({
        email: userInput.email,
        password: hashedPassword,
        role: userInput.role,
      })

      const result = await user.save()

      return {
        ...result._doc,
        password: null,
        _id: result.id,
        role: result.role,
      }
    },
  },
  Query: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error('User does not exists')
      }
      const isEqual = await bcrypt.compare(password, user.password)
      if (!isEqual) {
        throw new Error('Password is incorrect')
      }
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        process.env.SECRET_KEY_JWT,
        { expiresIn: '12h' }
      )
      return { userId: user.id, token: token, tokenExpiration: 1 }
    },
  },
}

export default resolvers
