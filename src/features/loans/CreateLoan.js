import React, { useState } from "react";
import { Alert, Button, TextField, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  createLoan,
  setAlertMessage,
  setAlertOpen,
  setAlertType,
} from "./loansSlice";
import "./loansStyles.scss";

export function CreateLoan() {
  const dispatch = useAppDispatch();
  const { alertMessage, alertType, alertOpen } = useAppSelector(
    (state) => state.loans
  );

  const [amount, setAmount] = useState();
  const [apr, setApr] = useState();
  const [term, setTerm] = useState();
  const [status, setStatus] = useState();
  const [owner_id, setOwnerId] = useState();

  const onAmountChanged = (e) => setAmount(e.target.valueAsNumber);
  const onAprChanged = (e) => setApr(e.target.valueAsNumber);
  const onTermChanged = (e) => setTerm(e.target.valueAsNumber);
  const onStatusChanged = (e) => setStatus(e.target.value);
  const onOwnerIdChanged = (e) => setOwnerId(e.target.valueAsNumber);

  async function handleCreateLoan() {
    if (amount && apr && term && status && owner_id) {
      await dispatch(
        createLoan({
          amount,
          apr,
          term,
          status,
          owner_id,
        })
      );
      setAmount("");
      setApr("");
      setTerm("");
      setStatus("");
      setOwnerId("");
    } else {
      dispatch(setAlertType({ type: "warning" }));
      dispatch(setAlertMessage({ msg: "Missing field in create loan" }));
      dispatch(setAlertOpen({ isOpen: true }));
    }
  }

  const handleCloseAlert = () => {
    dispatch(setAlertOpen({ isOpen: false }));
  };

  return (
    <>
      <h2 className="titleContainer">Create a Loan</h2>
      <div className="textfieldContainer">
        <TextField
          data-testid="amount-textfield"
          id="amount"
          type="number"
          required
          label="amount"
          value={amount}
          InputProps={{
            inputProps: { min: 1 },
          }}
          onChange={onAmountChanged}
        ></TextField>
        <TextField
          id="apr"
          type="number"
          required
          label="apr"
          value={apr}
          InputProps={{
            inputProps: { min: 1 },
          }}
          onChange={onAprChanged}
        ></TextField>
        <TextField
          id="term"
          type="number"
          required
          label="term"
          value={term}
          InputProps={{
            inputProps: { min: 1 },
          }}
          onChange={onTermChanged}
        ></TextField>
        <TextField
          id="status"
          required
          label="status"
          value={status}
          InputProps={{
            inputProps: { min: 1 },
          }}
          onChange={onStatusChanged}
        ></TextField>
        <TextField
          id="owner-id"
          type="number"
          required
          label="owner ID"
          value={owner_id}
          InputProps={{
            inputProps: { min: 1 },
          }}
          onChange={onOwnerIdChanged}
        ></TextField>
      </div>
      <Button onClick={handleCreateLoan} variant="contained">
        Create Loan
      </Button>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
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

export default CreateLoan;
