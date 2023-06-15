import React, { useState } from "react";
import { Alert, Button, TextField, Snackbar } from "@mui/material";
import {
  createUser,
  getAllUsers,
  setAlertMessage,
  setAlertType,
  setAlertOpen,
} from "./usersSlice";
import "./usersStyles.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export function CreateUser() {
  const dispatch = useAppDispatch();
  const { alertMessage, alertType, alertOpen } = useAppSelector(
    (state) => state.users
  );
  const [name, setName] = useState();

  const onNameChanged = (e) => setName(e.target.value);

  const handleCreateUser = async () => {
    if (name) {
      await dispatch(createUser(name));
      await setName("");
      dispatch(getAllUsers());
    } else {
      dispatch(setAlertType({ type: "warning" }));
      dispatch(setAlertMessage({ msg: "User name cannot be empty" }));
      dispatch(setAlertOpen({ isOpen: true }));
    }
  };

  const handleCloseAlert = () => {
    dispatch(setAlertOpen({ isOpen: false }));
  };

  return (
    <>
      <h2> Create a User for a Loan</h2>
      <div className="textfieldContainer">
        <TextField
          id="user-name"
          required
          label="user name"
          value={name}
          onChange={onNameChanged}
        ></TextField>
      </div>
      <Button onClick={handleCreateUser} variant="contained">
        Create User
      </Button>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CreateUser;
