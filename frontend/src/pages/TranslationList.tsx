import { useQuery } from '@apollo/react-hooks'
import { isEmpty } from 'ramda'
import React from 'react'
import TranslationContainer from '../components/TranslationContainer/TranslationContainer'
import {
  GET_TRANSLATIONS,
  TranslationData,
  TranslationVars,
} from '../graphql/translations/translation'
import { TextInput, Box } from 'grommet'

const TranslationList: React.FC = () => {
  const { data, loading, error } = useQuery<TranslationData, TranslationVars>(
    GET_TRANSLATIONS
  )

  if (loading) return <p>Loading ...</p>
  if (error) return <p>error ...</p>
  if (isEmpty(data?.translations)) return <p>Empty ...</p>

  return (
    <Box>
      {data?.translations.map(translation => (
        <TranslationContainer key={translation.key} translation={translation} />
      ))}
    </Box>
  )
}

export default TranslationList
