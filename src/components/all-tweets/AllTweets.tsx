import React, { useEffect, useState } from "react";
import styles from "./AllTweets.module.css";
import { Grid } from "@mui/material";
import NewTweet from "../new-tweet/NewTweet";
import { getAllTweets } from "../../services/AllTweets.service";
import Tweet from "../tweet/Tweet";
import { ITweetModel } from "../../interfaces/Common.interface";

const AllTweets = () => {
  const [tweets, setTweets] = useState<ITweetModel[]>([]);
  const [refreshTweet, setRefreshTweets] = useState(false);

  useEffect(() => {
    void fetchAllTweets();
  }, [refreshTweet]);

  const fetchAllTweets = async () => {
    const apiData = await getAllTweets();
    setTweets(apiData);
  };

  return (
    <Grid container>
      <Grid item xs={12} data-testid="new-tweet-container">
        <NewTweet
          refreshTweet={refreshTweet}
          setRefreshTweets={setRefreshTweets}
        />
        <hr className={styles.hrStyle} />
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

export default AllTweets;
