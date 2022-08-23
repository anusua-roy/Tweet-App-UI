import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IUserModel } from "../../interfaces/Common.interface";
import { getAllUsers } from "../../services/AllUsers.service";
import User from "../user/User";
import SearchUser from "../search-user/SearchUser";
import UserProfile from "../user-profile/UserProfile";

const AllUsers = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<IUserModel[]>([]);
  const [users, setUsers] = useState<IUserModel[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUserModel>();

  useEffect(() => {
    void fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllUsers = useCallback(async () => {
    const apiData = await getAllUsers();
    setAllUsers(apiData);
    setUsers(apiData);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle component="div" style={{ padding: 0, textAlign: "end" }}>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <UserProfile user={selectedUser!} />
        </DialogContent>
      </Dialog>
      <SearchUser
        search={search}
        setSearch={setSearch}
        allUsers={allUsers}
        setUsers={setUsers}
      />
      <Grid item xs={12}>
        <hr
          style={{
            height: 2,
            marginTop: 20,
            color: "#2b204f",
            backgroundColor: "#2b204f",
          }}
        />
      </Grid>
      {users.map((user, index) => {
        return (
          <User
            user={user}
            onCardClick={handleClickOpen}
            setSelectedUser={setSelectedUser}
          />
        );
      })}
    </Grid>
  );
};

export default AllUsers;
