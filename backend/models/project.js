import { Schema, model } from 'mongoose'

const ProjectSchema = new Schema({
  name: String
})

export default model("Project", ProjectSchema)