import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./utils/testUtils";
import App from "./App";

test("screen should have heading with text:", () => {
  renderWithProviders(<App />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Loan Amortization App"
  );
});
