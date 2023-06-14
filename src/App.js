import "./App.scss";
import CreateUser from "./features/users/CreateUser";
import CreateLoan from "./features/loans/CreateLoan";
import UsersList from "./features/users/UserSelection";
import Loans from "./features/loans/Loans";
import LoanSchedule from "./features/loans/LoanSchedule";
import ShareLoan from "./features/loans/ShareLoan";

function App() {
  return (
    <div className="loanAppContainer">
      <CreateUser />
      <CreateLoan />
      <UsersList />
      <Loans />
      <LoanSchedule />
      <ShareLoan />
    </div>
  );
}

export default App;
