import React from "react";

import App from "./App";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("full app rendering/navigating", () => {
  const history = createMemoryHistory();
  const { container, getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
});
