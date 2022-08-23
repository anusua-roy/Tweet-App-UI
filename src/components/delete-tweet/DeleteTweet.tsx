import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import { TWEET_DELETED } from "../../constants/Snackbar.constants";
import { DELETE_TWEET } from "../../constants/Static.constants";
import { AppContext } from "../../context/AppContext";
import { deleteTweet } from "../../services/DeleteTweet.service";

interface IDeleteTweetProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshTweet: boolean;
  setRefreshTweets: React.Dispatch<React.SetStateAction<boolean>>;
  tweetId: string;
}

const DeleteTweet = (props: IDeleteTweetProps) => {
  const { user } = useContext(AppContext);
  const { open, setOpen, refreshTweet, setRefreshTweets, tweetId } = props;
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (text: string) => {
    enqueueSnackbar(text);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteTweet = async () => {
    const apiData = await deleteTweet(user.username, tweetId);
    if (apiData.status === 204) {
      showSnackbar(TWEET_DELETED);
      setRefreshTweets(!refreshTweet);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{DELETE_TWEET.DELETE_TITLE}</DialogTitle>
      <DialogContent>
        <Typography mt={2} variant="body1" component={"p"} color="primary">
          {DELETE_TWEET.DELETE_PROMPT}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{DELETE_TWEET.CANCEL_BUTTON_TEXT}</Button>
        <Button onClick={handleDeleteTweet}>
          {DELETE_TWEET.DELETE_BUTTON_TEXT}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTweet;
