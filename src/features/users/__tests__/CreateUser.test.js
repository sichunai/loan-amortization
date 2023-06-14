import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../utils/testUtils";
import CreateUser from "../CreateUser";

test("screen should have heading with text:", () => {
  renderWithProviders(<CreateUser />);
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Create a User for a Loan"
  );
});

test("should handle textfield input and button click", async () => {
  renderWithProviders(<CreateUser />);
  const user = userEvent.setup();
  const usernameElement = screen.getByRole("textbox");
  await user.type(usernameElement, "april");
  expect(usernameElement.value).toBe("april");
});
