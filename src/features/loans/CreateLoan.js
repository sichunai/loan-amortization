import React, { useState } from "react";
import {
  Alert,
  Button,
  InputAdornment,
  TextField,
  Snackbar,
} from "@mui/material";
import { useAppDispatch } from "../../hooks/hooks";
import { createLoan } from "./loansSlice";
import "./loansStyles.scss";

export function CreateLoan() {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState();
  const [apr, setApr] = useState();
  const [term, setTerm] = useState();
  const [status, setStatus] = useState();
  const [owner_id, setOwnerId] = useState();
  const [openAlert, setAlertOpen] = useState(false);

  const onAmountChanged = (e) => setAmount(e.target.valueAsNumber);
  const onAprChanged = (e) => setApr(e.target.valueAsNumber);
  const onTermChanged = (e) => setTerm(e.target.valueAsNumber);
  const onStatusChanged = (e) => setStatus(e.target.value);
  const onOwnerIdChanged = (e) => setOwnerId(e.target.valueAsNumber);

  function handleCreateLoan() {
    if (amount && apr && term && status && owner_id) {
      dispatch(
        createLoan({
          amount,
          apr,
          term,
          status,
          owner_id,
        })
      );
    } else {
      setAlertOpen(true);
    }
  }

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <h2 className="titleContainer">Create a Loan</h2>
      <div className="textfieldContainer">
        <TextField
          data-testid="amount-textfield"
          id="amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
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
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="warning"
          sx={{ width: "100%" }}
        >
          All fields must be filled to create a loan
        </Alert>
      </Snackbar>
    </>
  );
}

export default CreateLoan;
