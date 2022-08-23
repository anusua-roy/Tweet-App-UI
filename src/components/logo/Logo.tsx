import React from "react";
import styles from "./Logo.module.css";
import { Grid, Typography } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import { APP_NAME } from "../../constants/Static.constants";

interface ILogoProps {
  iconOnly?: boolean;
  size?: number;
  color?:
    | "inherit"
    | "disabled"
    | "action"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
}

const Logo = (props: ILogoProps) => {
  const size = props.size ? props.size : 20;
  const iconOnly = props.iconOnly ? props.iconOnly : false;

  return (
    <Grid container>
      <Grid
        item
        sm={4}
        xs={iconOnly ? 12 : 3}
        fontSize={size}
        className={styles.icon}
      >
        <TagIcon fontSize="inherit" color={props.color} />
      </Grid>
      {!iconOnly && (
        <Grid item sm={8} xs={9} className={styles.textGrid}>
          <Typography
            variant="h3"
            component="h3"
            className={styles.text}
            fontSize={size}
            color={props.color}
          >
            {APP_NAME}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Logo;
