import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../utils/testUtils";
import CreateLoan from "../CreateLoan";

test("screen should have heading with text:", () => {
  renderWithProviders(<CreateLoan />);
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Create a Loan"
  );
});

test("should handle textfield input and button click", async () => {
  renderWithProviders(<CreateLoan />);
  const user = userEvent.setup();
  const text = "1";
  const amountElement = screen.getAllByRole("spinbutton")[0];
  const aprElement = screen.getAllByRole("spinbutton")[1];
  const termElement = screen.getAllByRole("spinbutton")[2];
  const statusElement = screen.getByRole("textbox");
  const ownerIdElement = screen.getAllByRole("spinbutton")[3];
  const buttonElement = screen.getByRole("button");
  await user.type(amountElement, text);
  await user.type(aprElement, text);
  await user.type(termElement, text);
  await user.type(statusElement, "active");
  await user.type(ownerIdElement, text);
  await user.click(buttonElement);
  expect(amountElement.value).toBe(text);
  expect(aprElement.value).toBe(text);
  expect(termElement.value).toBe(text);
  expect(statusElement.value).toBe("active");
  expect(ownerIdElement.value).toBe(text);
});

test("should handle button click without textfield input", async () => {
  renderWithProviders(<CreateLoan />);
  const user = userEvent.setup();
  const buttonElement = screen.getByRole("button");
  await user.click(buttonElement);
});
