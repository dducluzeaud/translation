import centered from '@storybook/addon-centered/react'
import { withKnobs, object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import TranslationContainer from './TranslationContainer'

const translation = {
  created_at: '1577876004241',
  key: 'common.button.validate',
  languages: {
    en: null,
    fr: 'Valider',
  },
}

storiesOf('TranslationContainer', module)
  .addDecorator(centered)
  .addDecorator(withKnobs)
  .add('default', () => (
    <TranslationContainer
      translation={object('translation', { ...translation })}
    />
  ))
