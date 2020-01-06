import { Schema, model } from 'mongoose'

const translationSchema = new Schema({
  key: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  languages: {
    en: {
      type: String,
    },
    fr: {
      type: String,
    },
  },
  updated: {
    type: Boolean,
    default: false,
  },
})

export default model('Translation', translationSchema)
