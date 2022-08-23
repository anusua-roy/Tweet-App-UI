import React from "react";
import styles from "./User.module.css";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { IUserModel } from "../../interfaces/Common.interface";

interface IUserProps {
  user: IUserModel;
  onCardClick?: () => void;
  setSelectedUser?: React.Dispatch<
    React.SetStateAction<IUserModel | undefined>
  >;
}

const User = (props: IUserProps) => {
  const { user, onCardClick, setSelectedUser } = props;

  const handleCardClick = () => {
    onCardClick && onCardClick();
    setSelectedUser && setSelectedUser(user);
  };

  return (
    <Grid container item sm={4} xs={12} onClick={handleCardClick}>
      <Card className={styles.cardContainer}>
        <CardContent>
          <Typography variant="h6" component="p">
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {`@${user.username}`}
          </Typography>
          <Typography variant="body1" component="p">
            {`${user.email}`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default User;
