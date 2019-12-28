import Translation from '../../models/translations'
import Project from '../../models/project'

const resolvers = {
  Mutation: {
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
        Translation.findOneAndUpdate(
          { traduction_key: translation.traduction_key },
          translation,
          { upsert: true, setDefaultsOnInsert: true, useFindAndModify: false }
        )

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
        return { message: error }
      }
      return { message: 'Traductions chargé avec succès' }
    },
  },
}

export default resolvers
