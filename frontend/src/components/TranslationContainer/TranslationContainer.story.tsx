import centered from "@storybook/addon-centered/react";
import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import TranslationContainer from "./TranslationContainer";

const translation = {
  created_at: "1577876004241",
  traduction_key: "common.button.validate",
  url: null,
  languages: {
    en: null,
    fr: "Valider"
  }
};

storiesOf("TranslationContainer", module)
  .addDecorator(centered)
  .addDecorator(withKnobs)
  .add("default", () => <TranslationContainer translation={translation} />);
