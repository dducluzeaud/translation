import React from "react";
import { render } from "@testing-library/react";
import TranslationContainer from "./TranslationContainer";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/react-testing";
import {
  Translation,
  UPDATE_TRANSLATION
} from "../../graphql/translations/translation";

const translation = {
  created_at: "la date",
  key: "common.test",
  languages: {
    en: "It's a test!",
    fr: "C'est un test!"
  }
};

test("Translation render correctly", () => {
  const { getByText, getByDisplayValue } = render(
    <MockedProvider addTypename={false}>
      <TranslationContainer translation={translation} />
    </MockedProvider>
  );

  expect(getByText("common.test")).toBeInTheDocument();
  expect(getByDisplayValue("It's a test!")).toBeInTheDocument();
  expect(getByDisplayValue("C'est un test!")).toBeInTheDocument();
  expect(getByText("en:")).toBeInTheDocument();
  expect(getByText("fr:")).toBeInTheDocument();
});

test("Translation can be interactive", () => {
  const { getByText, getByDisplayValue } = render(
    <MockedProvider addTypename={false}>
      <TranslationContainer translation={translation} />
    </MockedProvider>
  );
});
