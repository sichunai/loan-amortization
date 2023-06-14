import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";

import { useSelector } from "react-redux";

export function Loans() {
  const { selectedUserLoans } = useSelector((state) => state.users);

  return (
    <div className="tableContainer">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell align="right">APR</TableCell>
              <TableCell align="right">Term</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Owner ID</TableCell>
              <TableCell align="right">Loan ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedUserLoans.map((loan) => (
              <TableRow
                key={loan.amount}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {loan.amount}
                </TableCell>
                <TableCell align="right">{loan.apr}</TableCell>
                <TableCell align="right">{loan.term}</TableCell>
                <TableCell align="right">{loan.status}</TableCell>
                <TableCell align="right">{loan.owner_id}</TableCell>
                <TableCell align="right">{loan.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Loans;
