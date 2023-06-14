import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { createUser, getAllUsers } from "./usersSlice";
import "./usersStyles.scss";

export function CreateUser() {
  const dispatch = useDispatch();
  // const { created, userCreated } = useSelector((state) => state.users);
  const [name, setName] = useState();

  const onNameChanged = (e) => setName(e.target.value);

  const handleCreateUser = async () => {
    await dispatch(createUser(name));
    await setName("");
    dispatch(getAllUsers());
  };

  return (
    <div>
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
    </div>
  );
}

export default CreateUser;
