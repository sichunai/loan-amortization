import reducer, {
  createLoan,
  getLoanSchedule,
  shareLoanWith,
  setAlertMessage,
  setAlertType,
  setAlertOpen,
} from "../loansSlice";

describe("Loan slice reducer test", () => {
  const state = {
    alertMessage: "",
    alertOpen: false,
    alertType: "",
    loanSchedule: [],
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      alertMessage: "",
      alertOpen: false,
      alertType: "",
      loanSchedule: [],
    });
  });

  it("should handle setting an alert message", () => {
    const previousState = {};

    expect(reducer(previousState, setAlertMessage({ msg: "Alert" }))).toEqual({
      alertMessage: "Alert",
    });
  });

  it("should handle setting an alert type", () => {
    const previousState = {};

    expect(reducer(previousState, setAlertType({ type: "error" }))).toEqual({
      alertType: "error",
    });
  });

  it("should handle setting an alert open", () => {
    const previousState = {};

    expect(reducer(previousState, setAlertOpen({ isOpen: true }))).toEqual({
      alertOpen: true,
    });
  });

  it("should set alert info when createLoan action is fulfilled", () => {
    const action = {
      type: createLoan.fulfilled,
    };
    const initialState = reducer(state, action);
    expect(initialState).toEqual({
      alertMessage: "Loan created successfully",
      alertOpen: true,
      alertType: "success",
      loanSchedule: [],
    });
  });

  it("should handle loanSchedule when action is fulfilled", () => {
    const action = {
      type: getLoanSchedule.fulfilled,
      payload: [
        {
          month: 1,
          open_balance: 300000,
          total_payment: 152647.13485566564,
          principal_payment: 2647.134855665645,
          interest_payment: 150000,
          close_balance: 297352.8651443344,
        },
      ],
    };
    const initialState = reducer(state, action);
    expect(initialState).toEqual({
      alertMessage: "",
      alertOpen: false,
      alertType: "",
      loanSchedule: [
        {
          month: 1,
          open_balance: 300000,
          total_payment: 152647.13485566564,
          principal_payment: 2647.134855665645,
          interest_payment: 150000,
          close_balance: 297352.8651443344,
        },
      ],
    });
  });

  it("should handle loanSchedule when action is rejected", () => {
    const action = {
      type: getLoanSchedule.rejected,
      payload: "User 1 does not have access to Loan 2",
    };
    const initialState = reducer(state, action);
    expect(initialState).toEqual({
      alertMessage: "User 1 does not have access to Loan 2",
      alertOpen: true,
      alertType: "error",
      loanSchedule: [],
    });
  });

  it("should handle shareLoanWith when action is fulfilled", () => {
    const action = {
      type: shareLoanWith.fulfilled,
      payload: "success",
    };
    const initialState = reducer(state, action);
    expect(initialState).toEqual({
      alertMessage: "success",
      alertOpen: true,
      alertType: "success",
      loanSchedule: [],
    });
  });

  it("should set shareLoanWith when action is rejected", () => {
    const action = {
      type: shareLoanWith.rejected,
      payload: "error",
    };
    const initialState = reducer(state, action);
    expect(initialState).toEqual({
      alertMessage: "error",
      alertOpen: true,
      alertType: "error",
      loanSchedule: [],
    });
  });
});
