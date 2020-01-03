import gql from 'graphql-tag'

export interface TranslationVars {
  project: string
}

export interface Translation {
  created_at: string
  traduction_key: string
  url: string | null
  languages: {
    en: string | null
    fr: string | null
  }
}

export interface TranslationData {
  translations: Translation[]
}

export const GET_TRANSLATIONS = gql`
  query translation($project: String!) {
    translations: getTranslation(project: $project) {
      created_at
      traduction_key
      url
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
