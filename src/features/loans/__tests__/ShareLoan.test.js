import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../utils/testUtils";
import ShareLoan from "../ShareLoan";

test("screen should have heading with text:", () => {
  renderWithProviders(<ShareLoan />);
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Share a Loan"
  );
});

test("should handle textfield input and button click", async () => {
  renderWithProviders(<ShareLoan />);
  const user = userEvent.setup();
  const text = "1";
  const loanIdElement = screen.getAllByRole("spinbutton")[0];
  const ownerIdElement = screen.getAllByRole("spinbutton")[1];
  const userIdElement = screen.getAllByRole("spinbutton")[2];
  const buttonElement = screen.getByRole("button");
  await user.type(loanIdElement, text);
  await user.type(ownerIdElement, text);
  await user.type(userIdElement, text);
  await user.click(buttonElement);
  expect(loanIdElement.value).toBe(text);
  expect(ownerIdElement.value).toBe(text);
  expect(userIdElement.value).toBe(text);
});

test("should handle button click without textfield input", async () => {
  renderWithProviders(<ShareLoan />);
  const user = userEvent.setup();
  const buttonElement = screen.getByRole("button");
  await user.click(buttonElement);
});
