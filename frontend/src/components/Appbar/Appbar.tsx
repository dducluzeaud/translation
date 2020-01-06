import { Box, Anchor, Header } from 'grommet'
import React from 'react'

const Appbar: React.FC = () => (
  <Header background="light-1" pad="small" elevation="small">
    <Box direction="row" gap="medium">
      <Anchor label="Add" href="/translation/add" />
      <Anchor label="List" href="/translations" />
    </Box>
  </Header>
)

export default Appbar
