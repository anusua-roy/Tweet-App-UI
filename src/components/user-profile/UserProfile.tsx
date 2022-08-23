import React, { useCallback, useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { ITweetModel, IUserModel } from "../../interfaces/Common.interface";
import { getAllTweetsByUser } from "../../services/AllTweetsByUser";
import Tweet from "../tweet/Tweet";
import { AppContext } from "../../context/AppContext";
import NewTweet from "../new-tweet/NewTweet";

interface IUserProfileProps {
  user: IUserModel;
}

const UserProfile = (props: IUserProfileProps) => {
  const context = useContext(AppContext);
  const userContext = context.user;
  const { user } = props;
  const [tweets, setTweets] = useState<ITweetModel[]>([]);
  const [refreshTweet, setRefreshTweets] = useState(false);

  const fetchTweetsByUser = useCallback(async () => {
    const apiData = await getAllTweetsByUser(user.username);
    setTweets(apiData);
  }, [user]);

  useEffect(() => {
    void fetchTweetsByUser();
  }, [fetchTweetsByUser, refreshTweet]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" component="p">
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography variant="subtitle1" component="p">
          {`@${user.username}`}
        </Typography>
        <Typography variant="body1" component="p">
          {`${user.email}`}
        </Typography>
      </Grid>
      {user.username === userContext.username && (
        <Grid my={2} item xs={12}>
          <NewTweet
            refreshTweet={refreshTweet}
            setRefreshTweets={setRefreshTweets}
          />
        </Grid>
      )}
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
      {tweets.map((tweet, index) => {
        return (
          <Tweet
            key={index}
            tweet={tweet}
            index={index}
            refreshTweet={refreshTweet}
            setRefreshTweets={setRefreshTweets}
          />
        );
      })}
    </Grid>
  );
};

export default UserProfile;
