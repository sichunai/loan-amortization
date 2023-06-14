import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  loanCreated: {},
  loanSchedule: [],
  shareLoanSuccess: null,
};

export const createLoan = createAsyncThunk("loans/createLoan", async (loan) => {
  const response = await client.post(
    `https://gl-interview.azurewebsites.net/loans`,
    loan
  );
  return response.data;
});

export const getLoanSchedule = createAsyncThunk(
  "loans/loanSchedule",
  async ({ loanId, ownerId }) => {
    const response = await client.get(
      `https://gl-interview.azurewebsites.net/loans/${loanId}?user_id=${ownerId}`
    );
    return response.data;
  }
);

export const shareLoanWith = createAsyncThunk(
  "loans/shareLoan",
  async ({ loanId, ownerId, userId }) => {
    const response = await client.post(
      `https://gl-interview.azurewebsites.net/loans/${loanId}/share?owner_id=${ownerId}&user_id=${userId}`
    );
    return response.data;
  }
);

const loansSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createLoan.fulfilled, (state, action) => {
        state.loanCreated = action.payload;
      })
      .addCase(getLoanSchedule.fulfilled, (state, action) => {
        state.loanSchedule = action.payload;
      })
      .addCase(shareLoanWith.fulfilled, (state, action) => {
        state.shareLoanSuccess = action.payload;
      });
  },
});

export default loansSlice.reducer;
