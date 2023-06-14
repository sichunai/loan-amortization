import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

import { useDispatch } from "react-redux";
import { shareLoanWith } from "./loansSlice";

export function ShareLoan() {
  const dispatch = useDispatch();

  const [loanId, setLoanId] = useState();
  const [ownerId, setOwnerId] = useState();
  const [userId, setUserId] = useState();

  const onChangeLoanId = (e) => setLoanId(e.target.value);
  const onChangeOwnerId = (e) => setOwnerId(e.target.value);
  const onChangeUserId = (e) => setUserId(e.target.value);

  const onShareLoan = () => {
    dispatch(shareLoanWith({ loanId, ownerId, userId }));
  };

  return (
    <div>
      <h2>Share a Loan </h2>
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
    </div>
  );
}

export default ShareLoan;
