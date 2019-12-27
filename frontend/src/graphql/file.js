import gql from 'graphql-tag'

export const UPLOAD_TRANSLATIONS = gql`
    mutation uploadTranslations($value: Upload!) {
        uploadTranslations(value: $value) {
            message
        }
    }
`


