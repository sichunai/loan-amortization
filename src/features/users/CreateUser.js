import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "./usersSlice";

export function CreateUser() {
  const dispatch = useDispatch();
  // const { created, userCreated } = useSelector((state) => state.users);
  const [name, setName] = useState();

  const onNameChanged = (e) => setName(e.target.value);

  const handleCreateUser = () => {
    dispatch(createUser(name));
  };

  return (
    <div>
      <div> Create a User for a Loan</div>
      <div>
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
