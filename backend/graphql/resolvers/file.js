import Translation from '../../models/translations'
import Project from '../../models/project'
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import path from 'path'
import fs from 'fs'

existsSync(path.join(__dirname, '../../uploads')) ||
  mkdirSync(path.join(__dirname, '../../uploads'))

const createTranslation = (key, value, language) => {
  if (language === 'en') {
    return Translation.findOneAndUpdate(
      { key },
      {
        key,
        'languages.en': value,
        updated: true,
      },
      {
        upsert: true,
      }
    )
  }
  return Translation.findOneAndUpdate(
    { key },
    {
      key,
      'languages.fr': value,
      updated: true,
    },
    {
      upsert: true,
    }
  )
}

const resolvers = {
  Query: {
    getTranslation: async (_, { project }) => {
      const projectId = await Project.find({ name: project })
      return Translation.find({ project: projectId })
    },
  },
  Mutation: {
    uploadFile: async (_, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file

      await new Promise(res =>
        createReadStream()
          .pipe(
            createWriteStream(path.join(__dirname, '../../uploads', filename))
          )
          .on('close', res)
      )

      const dataFile = fs.readFileSync(
        path.join(__dirname, `../../uploads`, filename),
        'utf8'
      )

      const data = JSON.parse(dataFile)

      const language = filename.split('.')[0]

      for (const [key, value] of Object.entries(data)) {
        await createTranslation(key, value, language)
        console.log(key, value, 'AFRER CREATE TRANSLATION')
      }

      return { filename, mimetype, encoding }
    },
    uploadTranslations: async (_, args) => {
      const translations = await args.value

      // https://bezkoder.com/mongoose-one-to-many-relationship/
      const createProject = project =>
        Project.findOneAndUpdate({ name: project.name }, project, {
          upsert: true,
          setDefaultsOnInsert: true,
          useFindAndModify: false,
        })

      const createTranslation = translation =>
        Translation.findOneAndUpdate({ key: translation.key }, translation, {
          upsert: true,
          setDefaultsOnInsert: true,
          useFindAndModify: false,
        })

      const addTranslationToProject = (projectId, translationId) =>
        Translation.findByIdAndUpdate(
          translationId,
          { project: projectId },
          { new: true, useFindAndModify: false }
        )

      try {
        const project = await createProject({ name: 'Web' })

        Object.entries(translations).forEach(async ([key, value]) => {
          try {
            const translation = await createTranslation({
              traduction_key: key,
              languages: {
                fr: value,
              },
            })
            project = await addTranslationToProject(
              project._id,
              translation._id
            )
          } catch (error) {
            return { message: error }
          }
        })
      } catch (error) {
        console.error(error)
      }
      return { message: 'Traductions chargé avec succès' }
    },
  },
}

export default resolvers
