import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  userCreated: {
    username: "",
    id: "",
  },
  // selectedUser: "",
  // selectedUserId: null,
  selectedUserLoans: [],
  created: false,
  allUsers: [""],
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
    // setSelectedUser(state, action) {
    //   const { selectedUser } = action.payload;
    //   state.selectedUser = selectedUser;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.userCreated = action.payload;
        state.created = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(getUserLoans.fulfilled, (state, action) => {
        state.selectedUserLoans = action.payload;
      });
  },
});

// export const { setSelectedUser } = usersSlice.actions;

export default usersSlice.reducer;