import Translation from '../../models/translations'

const resolvers = {
  Query: {
    getTranslations: async () => await Translation.find({}).sort({ key: 1 }),
    // getTranslationsEN: async (_, { search }) =>
    //   await Translation.find({ 'languages.en': / / }).sort({
    //     key: 1,
    //   }),
    // getTranslationsFR: async (_, { search }) =>
    //   await Translation.find({ 'languages.fr': / / }).sort({
    //     key: 1,
    //   }),
    searchTranslation: async (_, { search }) => {
      return Translation.find({ $text: { $search: search } })
    },
  },
}

export default resolvers
