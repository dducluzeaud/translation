import { useQuery } from "@apollo/react-hooks";
import { isEmpty } from "ramda";
import React from "react";
import { useParams } from "react-router-dom";
import TranslationContainer from "../components/TranslationContainer/TranslationContainer";
import {
  GET_TRANSLATIONS,
  TranslationData,
  TranslationVars
} from "../graphql/translations/translation";
import { TextInput, Box } from "grommet";

const TranslationList: React.FC = () => {
  const { project } = useParams();

  const { data, loading, error } = useQuery<TranslationData, TranslationVars>(
    GET_TRANSLATIONS,
    {
      variables: { project: project! }
    }
  );

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>error ...</p>;
  if (isEmpty(data?.translations)) return <p>Empty ...</p>;

  return (
    <>
      <Box justify="end" width="small" pad="small">
        <TextInput></TextInput>
      </Box>
      {data?.translations.map(translation => (
        <TranslationContainer translation={translation} />
      ))}
    </>
  );
};

export default TranslationList;
