import React, { useState } from "react";
import { Button, TextField, InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createLoan } from "./loansSlice";

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
      <div> Create a Loan</div>
      <div>
        <TextField
          id="amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          type="number"
          required
          label="amount"
          value={amount}
          onChange={onAmountChanged}
        ></TextField>
        <TextField
          id="apr"
          type="number"
          required
          label="apr"
          value={apr}
          onChange={onAprChanged}
        ></TextField>
        <TextField
          id="term"
          type="number"
          required
          label="term"
          value={term}
          onChange={onTermChanged}
        ></TextField>
        <TextField
          id="status"
          required
          label="status"
          value={status}
          onChange={onStatusChanged}
        ></TextField>
        <TextField
          id="owner-id"
          type="number"
          required
          label="owner ID"
          value={owner_id}
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
