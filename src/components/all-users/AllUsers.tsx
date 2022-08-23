import React, { useEffect, useState } from "react";
import styles from "./AllUsers.module.css";
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
  }, []);

  const fetchAllUsers = async () => {
    const apiData = await getAllUsers();
    setAllUsers(apiData);
    setUsers(apiData);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle component="div" className={styles.dialogCloseButton}>
          <IconButton aria-label="close" onClick={handleClose} color="primary">
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
        <hr className={styles.hrStyle} />
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
