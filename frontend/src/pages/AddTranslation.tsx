import React from 'react'

import DragAndDrop from '../components/DragAndDrop/DragAndDrop'
import { Box } from 'grommet'
import { useMutation } from '@apollo/react-hooks'
import { uploadFileMutation } from '../graphql/translations/translation'
import gql from 'graphql-tag'

export const filesQuery = gql`
  {
    files
  }
`

const AddTranslation: React.FC = () => {
  const [uploadFile] = useMutation(uploadFileMutation, {
    variables: { query: filesQuery },
  })

  return (
    <Box align="center" justify="center" fill>
      <DragAndDrop uploadFile={uploadFile}></DragAndDrop>
    </Box>
  )
}

export default AddTranslation
