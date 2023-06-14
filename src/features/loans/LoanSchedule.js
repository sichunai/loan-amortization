import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  IconButton,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getLoanSchedule } from "./loansSlice";

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
      <div>Amortization Term </div>
      <div>
        <TextField
          id="loan-id"
          type="number"
          required
          label="Loan ID"
          value={loanId}
          onChange={onChangeLoanId}
        ></TextField>
        <TextField
          id="owner-id"
          type="number"
          required
          label="Owner ID"
          value={ownerId}
          onChange={onChangeOwnerId}
        ></TextField>
      </div>
      <Button onClick={onLookupLoan} variant="contained">
        Look up Loan Schedule
      </Button>

      <div>
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
                  <TableCell align="right">{loan.open_balance}</TableCell>
                  <TableCell align="right">{loan.total_payment}</TableCell>
                  <TableCell align="right">{loan.principal_payment}</TableCell>
                  <TableCell align="right">{loan.interest_payment}</TableCell>
                  <TableCell align="right">{loan.close_balance}</TableCell>
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
