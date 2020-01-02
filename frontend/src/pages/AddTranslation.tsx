import React from "react";

import DragAndDrop from "../components/DragAndDrop/DragAndDrop";
import { Box } from "grommet";

const AddTranslation: React.FC = () => {
  const uploadFile = () => {};

  return (
    <Box align="center" justify="center" fill>
      <DragAndDrop uploadFile={uploadFile}></DragAndDrop>
    </Box>
  );
};

export default AddTranslation;
