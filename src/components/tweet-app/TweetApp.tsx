import React, { useState, useContext } from "react";
import styles from "./TweetApp.module.css";
import { AppBar, Box, Grid, Tab, Tabs } from "@mui/material";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import FaceIcon from "@mui/icons-material/Face";
import Logo from "../logo/Logo";
import {
  DEVICE_SIZE,
  DEVICE_WIDTH,
  TWEET_APP_TABS_PAGE,
} from "../../constants/Static.constants";
import { AppContext } from "../../context/AppContext";
import AllTweets from "../all-tweets/AllTweets";
import AllUsers from "../all-users/AllUsers";
import MyProfile from "../my-profile/MyProfile";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const TweetApp = () => {
  const { setIsUserActive, setUser } = useContext(AppContext);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleUserLogout = () => {
    setIsUserActive && setIsUserActive(false);
    setUser &&
      setUser({
        userId: "",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        contact: "",
      });
  };

  return (
    <Box>
      <AppBar position="sticky">
        <Grid container>
          <Grid
            item
            sm={3}
            xs={2}
            className={styles.logoGrid}
            onClick={() => {
              setValue(0);
            }}
          >
            <Logo
              iconOnly={DEVICE_WIDTH > DEVICE_SIZE.sm ? false : true}
              size={20}
              color={"inherit"}
            />
          </Grid>
          <Grid item sm={9} xs={10}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              variant="scrollable"
            >
              <Tab
                icon={<DynamicFeedIcon />}
                iconPosition={
                  DEVICE_WIDTH > DEVICE_SIZE.sm ? "start" : undefined
                }
                label={
                  DEVICE_WIDTH > DEVICE_SIZE.sm
                    ? TWEET_APP_TABS_PAGE.TWEETS_TAB_LABEL
                    : undefined
                }
              />
              <Tab
                icon={<PeopleAltIcon />}
                iconPosition={
                  DEVICE_WIDTH > DEVICE_SIZE.sm ? "start" : undefined
                }
                label={
                  DEVICE_WIDTH > DEVICE_SIZE.sm
                    ? TWEET_APP_TABS_PAGE.USERS_TAB_LABEL
                    : undefined
                }
              />
              <Tab
                icon={<FaceIcon />}
                iconPosition={
                  DEVICE_WIDTH > DEVICE_SIZE.sm ? "start" : undefined
                }
                label={
                  DEVICE_WIDTH > DEVICE_SIZE.sm
                    ? TWEET_APP_TABS_PAGE.PROFILE_TAB_LABEL
                    : undefined
                }
              />
              <Tab
                icon={<LogoutIcon />}
                iconPosition={
                  DEVICE_WIDTH > DEVICE_SIZE.sm ? "start" : undefined
                }
                label={
                  DEVICE_WIDTH > DEVICE_SIZE.sm
                    ? TWEET_APP_TABS_PAGE.LOGOUT_TAB_LABEL
                    : undefined
                }
                onClick={handleUserLogout}
              />
            </Tabs>
          </Grid>
        </Grid>
      </AppBar>
      <TabPanel value={value} index={0}>
        <AllTweets />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AllUsers />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MyProfile />
      </TabPanel>
    </Box>
  );
};

export default TweetApp;
