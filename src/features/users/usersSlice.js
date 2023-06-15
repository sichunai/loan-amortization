import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  selectedUserLoans: [],
  allUsers: [],
  alertOpen: false,
  alertType: "",
  alertMessage: "",
};

export const createUser = createAsyncThunk("users/createUser", async (name) => {
  const response = await client.post(
    `https://gl-interview.azurewebsites.net/users`,
    { username: name }
  );
  return response.data;
});

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const response = await client.get(
    `https://gl-interview.azurewebsites.net/users`
  );
  return response.data;
});

export const getUserLoans = createAsyncThunk(
  "users/getUserLoans",
  async (selectedUserId) => {
    const response = await client.get(
      `https://gl-interview.azurewebsites.net/users/${selectedUserId}/loans`
    );
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAlertMessage(state, action) {
      const { msg } = action.payload;
      state.alertMessage = msg;
    },
    setAlertType(state, action) {
      const { type } = action.payload;
      state.alertType = type;
    },
    setAlertOpen(state, action) {
      const { isOpen } = action.payload;
      state.alertOpen = isOpen;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createUser.fulfilled, (state) => {
        state.alertType = "success";
        state.alertOpen = true;
        state.alertMessage = "User has been created";
      })
      .addCase(createUser.rejected, (state) => {
        state.alertType = "error";
        state.alertOpen = true;
        state.alertMessage = "User was not created";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(getUserLoans.fulfilled, (state, action) => {
        state.selectedUserLoans = action.payload;
      });
  },
});

export const { setAlertMessage, setAlertType, setAlertOpen } =
  usersSlice.actions;
export default usersSlice.reducer;
