import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  loanCreated: {},
  loanSchedule: [],
  shareLoanSuccess: null,
  alertMessage: "",
  alertType: "",
  alertOpen: false,
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
  async ({ loanId, ownerId }, { rejectWithValue }) => {
    try {
      const response = await client.get(
        `https://gl-interview.azurewebsites.net/loans/${loanId}?user_id=${ownerId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.detail);
    }
  }
);

export const shareLoanWith = createAsyncThunk(
  "loans/shareLoan",
  async ({ loanId, ownerId, userId }, { rejectWithValue }) => {
    try {
      const response = await client.post(
        `https://gl-interview.azurewebsites.net/loans/${loanId}/share?owner_id=${ownerId}&user_id=${userId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.detail);
    }
  }
);

const loansSlice = createSlice({
  name: "loans",
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
      .addCase(createLoan.fulfilled, (state, action) => {
        state.loanCreated = action.payload;
      })
      .addCase(getLoanSchedule.fulfilled, (state, action) => {
        state.loanSchedule = action.payload;
      })
      .addCase(getLoanSchedule.rejected, (state, action) => {
        state.alertMessage = action.payload;
        state.alertType = "error";
        state.alertOpen = true;
      })
      .addCase(shareLoanWith.fulfilled, (state, action) => {
        state.shareLoanSuccess = action.payload;
        state.alertMessage = action.payload;
        state.alertType = "success";
        state.alertOpen = true;
      })
      .addCase(shareLoanWith.rejected, (state, action) => {
        state.alertMessage = action.payload;
        state.alertType = "error";
        state.alertOpen = true;
      });
  },
});

export const { setAlertMessage, setAlertType, setAlertOpen } =
  loansSlice.actions;
export default loansSlice.reducer;
