import React, { useState } from "react";
import { Alert, Button, TextField, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getAllUsers } from "./usersSlice";
import "./usersStyles.scss";

export function CreateUser() {
  const dispatch = useDispatch();
  const { alertMessage, alertType } = useSelector((state) => state.users);
  const [openAlert, setAlertOpen] = useState(false);
  const [name, setName] = useState();

  const onNameChanged = (e) => setName(e.target.value);

  const handleCreateUser = async () => {
    if (name) {
      await dispatch(createUser(name));
      await setName("");
      dispatch(getAllUsers());
    }
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
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
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {alertMessage ? alertMessage : "user name cannot be empty"}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CreateUser;
