import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { isEmpty, isNil } from 'ramda'
import React, { useState, ChangeEvent } from 'react'
import TranslationContainer from '../components/TranslationContainer/TranslationContainer'
import {
  GET_TRANSLATIONS,
  TranslationData,
  TranslationVars,
  SEARCH_TRANSLATION,
} from '../graphql/translations/translation'
import { Box, InfiniteScroll, TextInput, Button } from 'grommet'
import { useEffect } from '@storybook/addons'

const TranslationList: React.FC = () => {
  const [search, setSearch] = useState('')

  const {
    data: translationList,
    loading: loadingList,
    error: errorList,
  } = useQuery<TranslationData, TranslationVars>(GET_TRANSLATIONS, {
    skip: search !== '',
  })

  const [
    searchTranslation,
    { data: translationSearch, loading: loadingSearch, error: errorSearch },
  ] = useLazyQuery(SEARCH_TRANSLATION, { fetchPolicy: 'no-cache' })

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const {
      target: { value: searched },
    } = event
    setSearch(searched)
  }

  if (loadingSearch || loadingList) return <p>Loading ...</p>
  if (errorSearch || errorList) return <p>error ...</p>
  if (isEmpty(translationList) || isEmpty(translationSearch))
    return <p>Empty ...</p>

  return (
    <Box>
      <Box pad="small" justify="end" width="100%">
        <form onSubmit={() => searchTranslation({ variables: { search } })}>
          <TextInput
            placeholder="type here"
            value={search}
            onChange={handleSearch}
          />
        </form>

        <Box />
        <InfiniteScroll
          items={
            search !== ''
              ? translationSearch?.searchTranslation
              : translationList?.translations
          }
        >
          {item => <TranslationContainer key={item.key} translation={item} />}
        </InfiniteScroll>
      </Box>
    </Box>
  )
}

export default TranslationList
