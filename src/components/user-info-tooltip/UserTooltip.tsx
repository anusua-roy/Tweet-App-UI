import React, { Fragment, ReactElement } from "react";
import { Tooltip, Typography } from "@mui/material";
import { IUserModel } from "../../interfaces/Common.interface";

interface IUserTooltipProps {
  user: IUserModel;
  children: ReactElement;
}

const UserTooltip = (props: IUserTooltipProps) => {
  const { user, children } = props;

  return (
    <Tooltip
      arrow
      placement="right"
      title={
        <Fragment>
          <Typography variant="subtitle1" component="p">
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography variant="subtitle2" component="p">
            {`@${user.username}`}
          </Typography>
          <Typography variant="caption" component="p">
            {`${user.email}`}
          </Typography>
        </Fragment>
      }
    >
      {children}
    </Tooltip>
  );
};

export default UserTooltip;
