import React, { useContext, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { AppContext } from "../../context/AppContext";
import NewTweet from "../new-tweet/NewTweet";
import { ITweetModel } from "../../interfaces/Common.interface";
import { updateTweet } from "../../services/UpdateTweet";
import { useSnackbar } from "notistack";
import { UPDATE_TWEET } from "../../constants/Static.constants";
import {
  INCORRECT_TWEET,
  TWEET_UPDATED,
} from "../../constants/Snackbar.constants";
import { IS_EMPTY_STRING } from "../../utils/validations";

interface IUpdateTweetInterface {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshTweet: boolean;
  setRefreshTweets: React.Dispatch<React.SetStateAction<boolean>>;
  tweet: ITweetModel;
}

const UpdateTweet = (props: IUpdateTweetInterface) => {
  const { user } = useContext(AppContext);
  const { open, setOpen, refreshTweet, setRefreshTweets } = props;
  const [tweet, setTweet] = useState(props.tweet.tweet);
  const [tags, setTags] = useState(props.tweet.tags);
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (text: string) => {
    enqueueSnackbar(text);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateTweet = async () => {
    if (IS_EMPTY_STRING(tweet) || tweet.length > 144) {
      showSnackbar(INCORRECT_TWEET);
    } else {
      const apiData = await updateTweet(user.username, props.tweet.tweetId, {
        tweet: tweet,
        tags: tags,
      });
      if (apiData.status === 200) {
        showSnackbar(TWEET_UPDATED);
        setRefreshTweets(!refreshTweet);
        handleClose();
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <NewTweet
          refreshTweet={refreshTweet}
          setRefreshTweets={setRefreshTweets}
          isEditable
          editedTweet={tweet}
          setEditedTweet={setTweet}
          editedTags={tags}
          setEditedTags={setTags}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{UPDATE_TWEET.CANCEL_BUTTON_TEXT}</Button>
        <Button onClick={handleUpdateTweet}>
          {UPDATE_TWEET.UPDATE_BUTTON_TEXT}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTweet;
