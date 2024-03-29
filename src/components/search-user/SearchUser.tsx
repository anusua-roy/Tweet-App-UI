import React, { BaseSyntheticEvent } from "react";
import styles from "./SearchUser.module.css";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { SEARCH_USER } from "../../constants/Static.constants";
import { IUserModel } from "../../interfaces/Common.interface";
import { searchUsers } from "../../services/SearchUser.service";

interface ISearchUserProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  allUsers: IUserModel[];
  setUsers: React.Dispatch<React.SetStateAction<IUserModel[]>>;
}

const SearchUser = (props: ISearchUserProps) => {
  const { search, setSearch, setUsers, allUsers } = props;

  const handleSearchChange = (e: BaseSyntheticEvent) => {
    if (e.target.value === "") handleClearSearch();
    else setSearch(e.target.value);
  };

  const handleSearchClick = async () => {
    const apiData = await searchUsers(search);
    setUsers(apiData);
  };

  const handleClearSearch = () => {
    setSearch("");
    setUsers(allUsers);
  };
  return (
    <Grid container item xs={12}>
      <Grid item sm={10} xs={8}>
        <TextField
          id="search-user"
          label={SEARCH_USER.SEARCH_LABEL}
          variant="outlined"
          className={styles.textFieldContainer}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" color="primary">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment:
              search !== "" ? (
                <IconButton onClick={handleClearSearch} color="primary">
                  <CloseIcon />
                </IconButton>
              ) : null,
          }}
          value={search}
          onChange={handleSearchChange}
        />
      </Grid>
      <Grid item sm={2} xs={4} className={styles.searchButtonGrid}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSearchClick}
        >
          {SEARCH_USER.SEARCH_BUTTON}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchUser;
