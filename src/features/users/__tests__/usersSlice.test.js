import reducer, {
  createUser,
  getAllUsers,
  getUserLoans,
  setAlertMessage,
} from "../usersSlice";

describe("User slice reducer test", () => {
  const state = {
    selectedUserLoans: [],
    allUsers: [],
    alertOpen: false,
    alertType: "",
    alertMessage: "",
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      selectedUserLoans: [],
      allUsers: [],
      alertOpen: false,
      alertType: "",
      alertMessage: "",
    });
  });

  it("should handle setting an alert message", () => {
    const previousState = {};

    expect(reducer(previousState, setAlertMessage({ msg: "Alert" }))).toEqual({
      alertMessage: "Alert",
    });
  });

  it("should set alert info when createUser action is fulfilled", () => {
    const action = {
      type: createUser.fulfilled,
    };
    const initialState = reducer(state, action);
    expect(initialState).toEqual({
      alertMessage: "User has been created",
      alertOpen: true,
      alertType: "success",
      selectedUserLoans: [],
      allUsers: [],
    });
  });

  it("should set alert info when createUser action is rejected", () => {
    const action = {
      type: createUser.rejected,
    };
    const initialState = reducer(state, action);
    expect(initialState).toEqual({
      alertMessage: "User was not created",
      alertOpen: true,
      alertType: "error",
      selectedUserLoans: [],
      allUsers: [],
    });
  });

  it("should handle get all users when action is fulfilled", () => {
    const action = {
      type: getAllUsers.fulfilled,
      payload: [
        {
          username: "kenny",
          id: 1,
        },
        {
          username: "stringzz",
          id: 2,
        },
      ],
    };
    const initialState = reducer(state, action);
    expect(initialState).toEqual({
      alertMessage: "",
      alertOpen: false,
      alertType: "",
      selectedUserLoans: [],
      allUsers: [
        {
          username: "kenny",
          id: 1,
        },
        {
          username: "stringzz",
          id: 2,
        },
      ],
    });
  });

  it("should handle getUserLoans when action is fulfilled", () => {
    const action = {
      type: getUserLoans.fulfilled,
      payload: [
        {
          amount: 10,
          apr: 1,
          term: 1,
          status: "active",
          owner_id: 2,
          id: 1,
        },
        {
          amount: 300000,
          apr: 6,
          term: 10,
          status: "active",
          owner_id: 1,
          id: 2,
        },
      ],
    };
    const initialState = reducer(state, action);
    expect(initialState).toEqual({
      alertMessage: "",
      alertOpen: false,
      alertType: "",
      allUsers: [],
      selectedUserLoans: [
        {
          amount: 10,
          apr: 1,
          term: 1,
          status: "active",
          owner_id: 2,
          id: 1,
        },
        {
          amount: 300000,
          apr: 6,
          term: 10,
          status: "active",
          owner_id: 1,
          id: 2,
        },
      ],
    });
  });
});
