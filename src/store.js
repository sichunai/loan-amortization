import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./features/users/usersSlice";
import loansReducer from "./features/loans/loansSlice";

const rootReducer = combineReducers({
  users: usersReducer,
  loans: loansReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = setupStore();
