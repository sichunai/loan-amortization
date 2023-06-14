import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/users/usersSlice";
import loansReducer from "./features/loans/loansSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    loans: loansReducer,
  },
});
