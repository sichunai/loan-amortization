import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUserLoans } from "./usersSlice";

export function UsersList() {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState("");
  const { allUsers } = useSelector((state) => state.users);

  const onUserChanged = (e) => {
    const selected = allUsers.find((user) => user.username === e.target.value);
    setSelectedUser(e.target.value);
    dispatch(getUserLoans(selected.id));
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const userSelections = allUsers.map((user) => (
    <MenuItem key={user.id} value={user.username}>
      {user.username}
    </MenuItem>
  ));
  return (
    <div className="dropdownContainer">
      <h2>Select From Users to Look Up Loans</h2>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="demo-simple-select-helper-label">Users</InputLabel>
        <Select
          labelId="user-selection-label"
          id="user-select"
          value={selectedUser}
          label="User for Loans"
          onChange={onUserChanged}
        >
          {userSelections}
        </Select>
      </FormControl>
    </div>
  );
}

export default UsersList;
