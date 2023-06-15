import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/testUtils";
import UserSelection from "../UserSelection";

test("screen should render with list of users", () => {
  const initialState = {
    allUsers: [
      {
        username: "kenny",
        id: 1,
      },
      {
        username: "stringzz",
        id: 2,
      },
    ],
    alertOpen: false,
    alertType: "",
    alertMessage: "",
    selectedUserLoans: [],
  };
  renderWithProviders(<UserSelection />, {
    preloadedState: { users: initialState },
  });
});
