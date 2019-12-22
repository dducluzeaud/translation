import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['developer', 'user'],
    default: 'user',
  },
})

export default model('User', userSchema)
