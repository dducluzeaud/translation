import Translation from '../../models/translations'

const resolvers = {
  Query: {
    getTranslation: async () => await Translation.find({}).sort({ key: 1 }),
  },
}

export default resolvers
