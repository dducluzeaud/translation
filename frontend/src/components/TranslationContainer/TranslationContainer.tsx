import React, { useState, ChangeEvent } from "react";
import { Translation } from "../../graphql/translations/translation";
import { Box, Button, TextInput } from "grommet";
import { FormEdit } from "grommet-icons";
import styled from "styled-components/macro";

interface Props {
  translation: Translation;
}

const InputWrapper: React.FC = ({ children }) => (
  <Box direction="row" align="center" justify="center" pad="xsmall">
    {children}
  </Box>
);

const TranslationContainer: React.FC<Props> = ({ translation }) => {
  const [editable, setEditable] = useState(false);
  const [fr, setFr] = useState(translation.languages.fr || "");
  const [en, setEn] = useState(translation.languages.en || "");
  const editInput = () => {
    setEditable(!editable);
  };

  const handleFr = (event: ChangeEvent<HTMLInputElement>) => {
    setFr(event.target.value);
  };

  const handleEn = (event: ChangeEvent<HTMLInputElement>) => {
    setEn(event.target.value);
  };

  return (
    <Box margin="small" pad="small" elevation="small" round="small">
      <TitleWrapper direction="row" justify="between">
        <h4>{translation.traduction_key}</h4>
        <Button icon={<FormEdit size="medium" />} onClick={editInput} />
      </TitleWrapper>
      <InputWrapper>
        <Label>fr:</Label>
        <TextInput
          size="small"
          value={fr}
          onChange={handleFr}
          disabled={!editable}
        />
      </InputWrapper>
      <InputWrapper>
        <Label>en:</Label>
        <TextInput
          size="small"
          value={en}
          onChange={handleEn}
          disabled={!editable}
        />
      </InputWrapper>
      {editable && <StyledButton label="Valider" primary />}
    </Box>
  );
};

const TitleWrapper = styled(Box)`
  line-height: 0;
  font-size: 15px;
`;

const Label = styled.p`
  width: 5%;
  margin-right: 0.5rem;
`;

const StyledButton = styled(Button)`
  width: 50%;
  margin: auto;
`;

export default TranslationContainer;
