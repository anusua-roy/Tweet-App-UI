import React, { useContext, useState } from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ITweetModel } from "../../interfaces/Common.interface";
import { TWEET_PAGE_CONSTANTS } from "../../constants/Static.constants";
import { AppContext } from "../../context/AppContext";
import { likeTweet } from "../../services/LikeTweet.service";
import AllReplies from "../all-replies/AllReplies";
import UserTooltip from "../user-info-tooltip/UserTooltip";
import Tag from "../tag/Tag";
import DeleteTweet from "../delete-tweet/DeleteTweet";
import UpdateTweet from "../update-tweet/UpdateTweet";

interface ITweetProps {
  tweet: ITweetModel;
  index: number;
  refreshTweet: boolean;
  setRefreshTweets: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tweet = (props: ITweetProps) => {
  const { user } = useContext(AppContext);
  const { tweet, index, refreshTweet, setRefreshTweets } = props;
  const [openEditPrompt, setOpenEditPrompt] = useState(false);
  const [openDeletePrompt, setOpenDeletePrompt] = useState(false);
  const [likeCount, setlikeCount] = useState(tweet.likeCount);
  const [replies, setReplies] = useState(tweet.replies);
  const [showComments, setShowComments] = useState(false);

  const handleLikeTweet = async () => {
    const apiData = await likeTweet(user.username, tweet.tweetId, 1);
    if (apiData.status === 200) setlikeCount(likeCount + 1);
  };

  const handleUnlikeTweet = async () => {
    const apiData = await likeTweet(user.username, tweet.tweetId, -1);
    if (apiData.status === 200) setlikeCount(likeCount - 1);
  };

  const handleEdit = () => {
    setOpenEditPrompt(true);
  };

  const handleDelete = () => {
    setOpenDeletePrompt(true);
  };

  return (
    <Grid container item xs={12} mt={2}>
      {index !== 0 && (
        <Grid item xs={12}>
          <hr />
        </Grid>
      )}
      <UpdateTweet
        open={openEditPrompt}
        setOpen={setOpenEditPrompt}
        refreshTweet={refreshTweet}
        setRefreshTweets={setRefreshTweets}
        tweet={tweet}
      />
      <DeleteTweet
        open={openDeletePrompt}
        setOpen={setOpenDeletePrompt}
        refreshTweet={refreshTweet}
        setRefreshTweets={setRefreshTweets}
        tweetId={tweet.tweetId}
      />
      <Grid item xs={12}>
        <UserTooltip user={tweet.tweetedBy}>
          <Typography
            my={1}
            variant="subtitle1"
            component="span"
            color={"blueviolet"}
          >
            {`@${tweet.tweetedBy.username}`}
          </Typography>
        </UserTooltip>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" component="p">
          {tweet.tweet}
        </Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
        {tweet.tags.map((tag, index) => {
          return (
            <Tag key={index} isEditable={false} variant="body1" tag={tag} />
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <Typography mt={1} variant="body2" component="p" color={"gray"}>
          {`${likeCount} Likes, ${replies.length} Replies`}
        </Typography>
      </Grid>
      <Grid container item xs={12} mt={1}>
        {user.username !== tweet.tweetedBy.username && (
          <Grid container item sm={2} xs={3} alignSelf={"center"}>
            <Grid item xs={6}>
              <IconButton aria-label="like-tweet" onClick={handleLikeTweet}>
                <SentimentSatisfiedAltIcon htmlColor="orange" />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <IconButton aria-label="unlike-tweet" onClick={handleUnlikeTweet}>
                <SentimentVeryDissatisfiedIcon htmlColor="crimson" />
              </IconButton>
            </Grid>
          </Grid>
        )}
        {user.username === tweet.tweetedBy.username && (
          <Grid container item sm={2} xs={3} alignSelf={"center"}>
            <Grid item xs={6}>
              <IconButton aria-label="edit-tweet" onClick={handleEdit}>
                <EditIcon htmlColor="darkorchid" />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <IconButton aria-label="delete-tweet" onClick={handleDelete}>
                <DeleteIcon htmlColor="darkorchid" />
              </IconButton>
            </Grid>
          </Grid>
        )}
        <Grid item sm={10} xs={9}>
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              setShowComments(!showComments);
            }}
          >
            {!showComments
              ? TWEET_PAGE_CONSTANTS.SHOW_COMMENTS
              : TWEET_PAGE_CONSTANTS.HIDE_COMMENTS}
          </Button>
        </Grid>
      </Grid>
      {showComments && (
        <Grid container item xs={12}>
          <AllReplies
            replies={replies}
            setReplies={setReplies}
            tweetId={tweet.tweetId}
            username={tweet.tweetedBy.username}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Tweet;
