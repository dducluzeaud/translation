import Translation from '../../models/translations'
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

const setQuery = (en, fr) => {
  if (en && fr) return { 'languages.en': en, 'languages.fr': fr }
  if (en && !fr) return { 'languages.en': en }
  if (!en && fr) return { 'languages.fr': fr }
  return {}
}

const resolvers = {
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
      }

      return { filename, mimetype, encoding }
    },
    updateTranslation: async (_, { updateInput }) => {
      try {
        const { key, languages } = updateInput

        const existingKey = await Translation.findOne({ key })
        if (!existingKey) {
          throw new Error('Invalid key')
        }

        const query = setQuery(languages.en, languages.fr)

        return Translation.findOneAndUpdate({ key: updateInput.key }, query, {
          useFindAndModify: false,
          new: true,
        })
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}

export default resolvers
