import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  userCreated: {
    username: "",
    id: "",
  },
  selectedUserLoans: [],
  allUsers: [""],
  alertType: "warning",
  alertMessage: "user name cannot be empty",
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
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.userCreated = action.payload;
        state.alertType = "success";
        state.alertMessage = "User has been created!";
      })
      .addCase(createUser.rejected, (state) => {
        state.alertType = "error";
        state.alertMessage = "User was not created.";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      });
  },
});

export default usersSlice.reducer;
