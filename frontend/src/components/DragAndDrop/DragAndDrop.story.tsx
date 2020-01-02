import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered";
import DragAndDrop from "./DragAndDrop";
import React from "react";

storiesOf("DragAndDrop", module)
  .addDecorator(centered)
  .add("default", () => <DragAndDrop uploadFile={() => {}} />);
