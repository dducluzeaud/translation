import React from 'react'
import { render } from '@testing-library/react'
import Appbar from './Appbar'
import '@testing-library/jest-dom/extend-expect'

test('Appbar shows render items correctly', () => {
  const { getByText } = render(<Appbar />)
  expect(getByText('Add')).toBeInTheDocument()
  expect(getByText('List')).toBeInTheDocument()
  expect(getByText('List')).toBeInTheDocument()
})
