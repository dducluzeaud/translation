import { Schema, model } from 'mongoose'

const translationSchema = new Schema({
  traduction_key: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  url: {
    type: String,
  },
  languages: {
    en: {
      type: String,
      required: true
    },
    fr: {
      type: String,
      required: true
    }
  },
  updated: {
    type: Boolean,
    default: false,
  },
  project: {
    type: mongoose.Schema.Types.objectID,
    ref: "Project"
  }
})

export default model('Translation', translationSchema)