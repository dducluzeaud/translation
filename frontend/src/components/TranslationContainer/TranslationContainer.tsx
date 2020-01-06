import React, { useState, ChangeEvent } from 'react'
import {
  Translation,
  UPDATE_TRANSLATION,
} from '../../graphql/translations/translation'
import { Box, Button, TextInput } from 'grommet'
import { FormEdit } from 'grommet-icons'
import styled from 'styled-components/macro'
import { useMutation } from '@apollo/react-hooks'

interface Props {
  translation: Translation
}

const InputWrapper: React.FC = ({ children }) => (
  <Box direction="row" align="center" justify="center" pad="xsmall">
    {children}
  </Box>
)

type languages = Pick<Translation, 'languages'>
type init = {
  en: string | null
  fr: string | null
}

interface InitialState {
  [key: string]: string | null
}

const setInitialInputState = (init: init) => {
  const initialState: InitialState = {}

  for (const [language, translation] of Object.entries(init)) {
    initialState[language] = translation
  }

  return initialState
}

const TranslationContainer: React.FC<Props> = ({ translation }) => {
  const [editable, setEditable] = useState(false)
  const [input, setInput] = useState(() =>
    setInitialInputState(translation.languages)
  )

  const [updateTranslation, { data }] = useMutation(UPDATE_TRANSLATION)

  const editInput = () => {
    setEditable(!editable)
  }

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    event.persist()
    setInput(() => ({ ...input, [key]: event.target.value }))
  }

  const handleValidateClick = () => {
    updateTranslation({ variables: { key: translation.key, languages: input } })
    setEditable(false)
  }

  return (
    <Box margin="small" pad="small" elevation="small" round="small">
      <TitleWrapper direction="row" justify="between">
        <h4>{translation.key}</h4>
        <Button icon={<FormEdit size="medium" />} onClick={editInput} />
      </TitleWrapper>

      {Object.entries(translation.languages).map(([key, value]) => (
        <InputWrapper key={key}>
          <Label>{key}:</Label>
          <TextInput
            size="small"
            value={input[key] || ''}
            onChange={event => handleInputChange(event, key)}
            disabled={!editable}
          />
        </InputWrapper>
      ))}

      {editable && (
        <StyledButton label="Valider" primary onClick={handleValidateClick} />
      )}
    </Box>
  )
}

const TitleWrapper = styled(Box)`
  line-height: 0;
  font-size: 15px;
`

const Label = styled.p`
  width: 5%;
  margin-right: 0.5rem;
`

const StyledButton = styled(Button)`
  width: 50%;
  margin: auto;
`

export default TranslationContainer
