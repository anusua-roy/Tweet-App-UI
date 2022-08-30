import React, { BaseSyntheticEvent, useContext, useState } from "react";
import styles from "./NewTweet.module.css";
import { Button, Grid, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { NEW_TWEET } from "../../constants/Static.constants";
import {
  INCORRECT_TWEET,
  TWEET_POSTED,
} from "../../constants/Snackbar.constants";
import { IS_EMPTY_STRING } from "../../utils/validations";
import { AppContext } from "../../context/AppContext";
import { AddTweet } from "../../services/AddTweet.service";
import Tag from "../tag/Tag";
import NewTag from "../new-tag/NewTag";

interface INewTweetModel {
  refreshTweet: boolean;
  setRefreshTweets: React.Dispatch<React.SetStateAction<boolean>>;
  isEditable?: boolean;
  editedTweet?: string;
  setEditedTweet?: React.Dispatch<React.SetStateAction<string>>;
  editedTags?: string[];
  setEditedTags?: React.Dispatch<React.SetStateAction<string[]>>;
}

const NewTweet = (props: INewTweetModel) => {
  const {
    refreshTweet,
    setRefreshTweets,
    isEditable,
    editedTweet,
    setEditedTweet,
    editedTags,
    setEditedTags,
  } = props;
  const [tweet, setTweet] = useState(
    isEditable && editedTweet ? editedTweet : ""
  );
  const [tags, setTags] = useState<string[]>(
    isEditable && editedTags?.length ? [...editedTags] : []
  );
  const { user } = useContext(AppContext);

  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (text: string) => {
    enqueueSnackbar(text);
  };

  const handleTweetChange = (e: BaseSyntheticEvent) => {
    setTweet(e.target.value);
    isEditable && setEditedTweet && setEditedTweet(e.target.value);
  };

  const handlePostTweet = async () => {
    if (IS_EMPTY_STRING(tweet) || tweet.length > 144) {
      showSnackbar(INCORRECT_TWEET);
    } else {
      const apiData = await AddTweet(user.username, {
        tweet: tweet,
        tags: tags,
      });
      if (apiData.status === 201) {
        setRefreshTweets(!refreshTweet);
        setTweet("");
        setTags([]);
        showSnackbar(TWEET_POSTED);
      }
    }
  };

  return (
    <Grid container item xs={12} spacing={2}>
      <Grid item xs={12}>
        <TextField
          className={styles.textField}
          id="new-post"
          data-testid="new-post-textfield"
          label={
            isEditable
              ? NEW_TWEET.EDIT_TWEET_TEXTFIELD_LABEL
              : NEW_TWEET.TEXTFIELD_LABEL
          }
          multiline
          rows={4}
          value={tweet}
          onChange={handleTweetChange}
        />
      </Grid>
      <Grid item xs={12}>
        {tags.map((tag, index) => {
          return (
            <Tag
              variant="body1"
              tag={tag}
              key={index}
              tags={tags}
              setTags={setTags}
              setEditedTags={setEditedTags}
              isEditable
            />
          );
        })}
      </Grid>
      <Grid item xs={9} className={styles.newTagGridContainer}>
        <NewTag tags={tags} setTags={setTags} setEditedTags={setEditedTags} />
      </Grid>
      {!isEditable && (
        <Grid item xs={3} className={styles.buttonGrid}>
          <Button
            data-testid="new-tweet-post-button"
            variant="contained"
            size={"medium"}
            onClick={handlePostTweet}
          >
            {NEW_TWEET.POST_BUTTON_TEXT}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default NewTweet;
