import React, { useState } from "react";
import { Alert, Button, TextField, Snackbar } from "@mui/material";
import {
  shareLoanWith,
  setAlertMessage,
  setAlertType,
  setAlertOpen,
} from "./loansSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export function ShareLoan() {
  const dispatch = useAppDispatch();
  const { alertMessage, alertType, alertOpen } = useAppSelector(
    (state) => state.loans
  );

  const [loanId, setLoanId] = useState();
  const [ownerId, setOwnerId] = useState();
  const [userId, setUserId] = useState();

  const onChangeLoanId = (e) => setLoanId(e.target.value);
  const onChangeOwnerId = (e) => setOwnerId(e.target.value);
  const onChangeUserId = (e) => setUserId(e.target.value);

  const handleCloseAlert = () => {
    dispatch(setAlertOpen({ isOpen: false }));
  };

  const onShareLoan = () => {
    if (loanId && ownerId && userId) {
      dispatch(shareLoanWith({ loanId, ownerId, userId }));
    } else {
      dispatch(setAlertType({ type: "warning" }));
      dispatch(
        setAlertMessage({ msg: "Missing Loan ID or Owner ID or User ID" })
      );
      dispatch(setAlertOpen({ isOpen: true }));
    }
  };

  return (
    <>
      <h2>Share a Loan</h2>
      <div className="textfieldContainer">
        <TextField
          id="loan-id"
          type="number"
          required
          label="Loan ID"
          value={loanId}
          InputProps={{
            inputProps: { min: 1 },
          }}
          onChange={onChangeLoanId}
        ></TextField>
        <TextField
          id="owner-id"
          type="number"
          required
          label="Owner ID"
          value={ownerId}
          InputProps={{
            inputProps: { min: 1 },
          }}
          onChange={onChangeOwnerId}
        ></TextField>
        <TextField
          id="user-id"
          type="number"
          required
          label="User ID"
          value={userId}
          InputProps={{
            inputProps: { min: 1 },
          }}
          onChange={onChangeUserId}
        ></TextField>
      </div>
      <Button onClick={onShareLoan} variant="contained">
        Share a Loan
      </Button>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ShareLoan;
