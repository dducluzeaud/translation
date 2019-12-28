import mongoose from 'mongoose'

const translationSchema = new mongoose.Schema({
  traduction_key: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  url: {
    type: String,
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
  project: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Project',
  },
})

export default mongoose.model('Translation', translationSchema)
