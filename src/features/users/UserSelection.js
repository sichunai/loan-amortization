import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUserLoans } from "./usersSlice";

export function UsersList() {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState("");
  // const [selectedUserId, setSelectedUserId] = useState();
  const { allUsers, created } = useSelector((state) => state.users);

  const onUserChanged = (e) => {
    // dispatch(setSelectedUser({ selectedUser: e.target.value }));
    const selected = allUsers.find((user) => user.username === e.target.value);
    setSelectedUser(e.target.value);
    // setSelectedUserId(selected.id);
    dispatch(getUserLoans(selected.id));
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [created]);

  const userSelections = allUsers.map((user) => (
    <MenuItem key={user.id} value={user.username}>
      {user.username}
    </MenuItem>
  ));
  return (
    <div>
      {/* <div> All Users</div> */}
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
