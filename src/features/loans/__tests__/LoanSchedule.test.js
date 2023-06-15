import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../utils/testUtils";
import LoanSchedule from "../LoanSchedule";

test("screen should have heading with text:", () => {
  renderWithProviders(<LoanSchedule />);
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Amortization Term"
  );
});

test("screen should render with loanSchedule", () => {
  const initialState = {
    loanSchedule: [
      {
        month: 1,
        open_balance: 300000,
        total_payment: 152647.13485566564,
        principal_payment: 2647.134855665645,
        interest_payment: 150000,
        close_balance: 297352.8651443344,
      },
    ],
    alertMessage: "",
    alertType: "",
    alertOpen: false,
  };
  renderWithProviders(<LoanSchedule />, {
    preloadedState: { loans: initialState },
  });
  expect(screen.getAllByRole("row")[1]).toHaveTextContent("January");
});

test("should handle textfield input and button click", async () => {
  renderWithProviders(<LoanSchedule />);
  const user = userEvent.setup();
  const text = "1";
  const loanIdElement = screen.getAllByRole("spinbutton")[0];
  const ownerIdElement = screen.getAllByRole("spinbutton")[1];
  const buttonElement = screen.getByRole("button");
  await user.type(loanIdElement, text);
  await user.type(ownerIdElement, text);
  await user.click(buttonElement);
  expect(loanIdElement.value).toBe(text);
  expect(ownerIdElement.value).toBe(text);
});

test("should handle button click without textfield input", async () => {
  renderWithProviders(<LoanSchedule />);
  const user = userEvent.setup();
  const buttonElement = screen.getByRole("button");
  await user.click(buttonElement);
});
