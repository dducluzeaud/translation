const resolvers = {
    Mutation: {
        uploadTranslations: async (_, args) => {
            const translations = await args.value
            Object.entries(translations).forEach(([key, value]) => console.log(key, value))
            return { message: "Traductions chargé avec succès" }
        },
    }
}

export default resolvers