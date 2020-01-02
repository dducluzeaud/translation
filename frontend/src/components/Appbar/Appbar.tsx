import { Box, Anchor, Header } from "grommet";
import React from "react";

const Appbar: React.FC = () => (
  <Header background="light-1" pad="small" elevation="small">
    <Box direction="row" gap="medium">
      <Anchor label="Home" href="/home" />
      <Anchor label="Profile" href="#" />
    </Box>
  </Header>
);

export default Appbar;
