import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getLoanSchedule } from "./loansSlice";
import "./loansStyles.scss";

export function LoanSchedule() {
  const dispatch = useDispatch();
  const { loanSchedule } = useSelector((state) => state.loans);

  const [loanId, setLoanId] = useState();
  const [ownerId, setOwnerId] = useState();

  const onChangeLoanId = (e) => setLoanId(e.target.value);
  const onChangeOwnerId = (e) => setOwnerId(e.target.value);

  const onLookupLoan = () => {
    dispatch(getLoanSchedule({ loanId, ownerId }));
  };

  const MONTHS = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  return (
    <div>
      <h2>Amortization Term </h2>
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
      </div>
      <Button onClick={onLookupLoan} variant="contained">
        Look up Loan Schedule
      </Button>

      <div className="tableContainer">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell align="right">Open Balance</TableCell>
                <TableCell align="right">Total Payment</TableCell>
                <TableCell align="right">Principle Payment</TableCell>
                <TableCell align="right">Interest Payment</TableCell>
                <TableCell align="right">Closed Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loanSchedule.map((loan, index) => (
                <TableRow
                  key={loanId + index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {MONTHS[loan.month]}
                  </TableCell>
                  <TableCell align="right">
                    {Number.parseFloat(loan.open_balance).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {Number.parseFloat(loan.total_payment).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {Number.parseFloat(loan.principal_payment).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {Number.parseFloat(loan.interest_payment).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {Number.parseFloat(loan.close_balance).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default LoanSchedule;
