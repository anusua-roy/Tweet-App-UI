import React from "react";
import { Grid } from "@mui/material";
import styles from "./AllReplies.module.css";
import { IReplyTweetModel } from "../../interfaces/Common.interface";
import Reply from "../reply/Reply";
import NewReply from "../new-reply/NewReply";

interface IAllRepliesProps {
  replies: IReplyTweetModel[];
  setReplies: React.Dispatch<React.SetStateAction<IReplyTweetModel[]>>;
  username: string;
  tweetId: string;
}

const AllReplies = (props: IAllRepliesProps) => {
  const { tweetId, username, replies, setReplies } = props;

  return (
    <Grid container mx={2} my={1} className={styles.background}>
      {replies.map((reply, index) => {
        return <Reply reply={reply} key={index} />;
      })}
      <NewReply
        replies={replies}
        setReplies={setReplies}
        tweetId={tweetId}
        username={username}
      />
    </Grid>
  );
};

export default AllReplies;
