import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/testUtils";
import Loans from "../Loans";

test("screen should render with selected user loans", () => {
  const initialState = {
    selectedUserLoans: [
      {
        amount: 10,
        apr: 1,
        term: 1,
        status: "active",
        owner_id: 2,
        id: 1,
      },
    ],
    allUsers: [""],
    alertOpen: false,
    alertType: "",
    alertMessage: "",
  };
  renderWithProviders(<Loans />, {
    preloadedState: { users: initialState },
  });
  expect(screen.getAllByRole("row")[1]).toHaveTextContent("active");
});
