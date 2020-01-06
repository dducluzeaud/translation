import gql from 'graphql-tag'

export interface TranslationVars {
  project: string
}

export interface Translation {
  created_at: string
  key: string
  languages: {
    en: string | null
    fr: string | null
  }
}

export interface TranslationData {
  translations: Translation[]
}

export const GET_TRANSLATIONS = gql`
  query translation {
    translations: getTranslation {
      created_at
      key
      languages {
        en
        fr
      }
    }
  }
`

export const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
    }
  }
`

export const UPDATE_TRANSLATION = gql`
  mutation updateTranslation($key: String!, $languages: LanguagesInput!) {
    updateTranslation(updateInput: { key: $key, languages: $languages }) {
      key
      languages {
        en
        fr
      }
      updated
    }
  }
`
