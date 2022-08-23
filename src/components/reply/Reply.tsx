import React from "react";
import { Grid, Typography } from "@mui/material";
import { IReplyTweetModel } from "../../interfaces/Common.interface";
import UserTooltip from "../user-info-tooltip/UserTooltip";
import Tag from "../tag/Tag";

interface IReplyProps {
  reply: IReplyTweetModel;
}

const Reply = (props: IReplyProps) => {
  const { reply } = props;
  return (
    <Grid container item xs={12} px={2}>
      <Grid item xs={12}>
        <UserTooltip user={reply.repliedBy}>
          <Typography my={1} variant="subtitle2" component="span">
            {`@${reply.repliedBy.username}`}
          </Typography>
        </UserTooltip>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" component="p">
          {reply.reply}
        </Typography>
      </Grid>
      <Grid item mt={2} xs={12}>
        {reply.tags.map((tag, index) => {
          return (
            <Tag key={index} isEditable={false} variant="body2" tag={tag} isReply />
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <hr />
      </Grid>
    </Grid>
  );
};

export default Reply;
