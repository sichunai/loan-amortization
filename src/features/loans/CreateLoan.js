import React, { useState } from "react";
import { Button, TextField, InputAdornment } from "@mui/material";
import { useDispatch } from "react-redux";
import { createLoan } from "./loansSlice";
import "./loansStyles.scss";

export function CreateLoan() {
  const dispatch = useDispatch();
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

  function handleCreateLoan() {
    dispatch(
      createLoan({
        amount,
        apr,
        term,
        status,
        owner_id,
      })
    );
  }

  return (
    <div>
      <h2 className="titleContainer"> Create a Loan</h2>
      <div className="textfieldContainer">
        <TextField
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
    </div>
  );
}

export default CreateLoan;
