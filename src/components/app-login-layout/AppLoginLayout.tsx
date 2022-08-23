import React from "react";
import styles from "./AppLoginLayout.module.css";
import { Grid, Typography } from "@mui/material";
import {
  APP_SUBTEXT,
  DEVICE_SIZE,
  DEVICE_WIDTH,
} from "../../constants/Static.constants";
import Logo from "../logo/Logo";
import LoginForm from "../login-form/LoginForm";

const AppLoginLayout = () => {
  return (
    <Grid container className={styles.layout}>
      <Grid item md={7} xs={12} className={styles.subLayout}>
        <Logo
          size={DEVICE_WIDTH > DEVICE_SIZE.sm ? 60 : 45}
          color={"primary"}
        />
        <Typography variant="h6" component="div" color={"primary"}>
          {APP_SUBTEXT}
        </Typography>
      </Grid>
      <Grid item md={5} xs={12} className={styles.loginForm}>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default AppLoginLayout;
