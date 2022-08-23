import React, { BaseSyntheticEvent, useContext, useState } from "react";
import styles from "./NewReply.module.css";
import { Grid, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { NEW_REPLY } from "../../constants/Static.constants";
import NewTag from "../new-tag/NewTag";
import Tag from "../tag/Tag";
import { IReplyTweetModel } from "../../interfaces/Common.interface";
import { addReply } from "../../services/AddReply.service";
import { AppContext } from "../../context/AppContext";
import { IS_EMPTY_STRING } from "../../utils/validations";
import { useSnackbar } from "notistack";
import {
  INCORRECT_REPLY,
  REPLY_POSTED,
} from "../../constants/Snackbar.constants";

interface INewReplyProps {
  username: string;
  tweetId: string;
  replies: IReplyTweetModel[];
  setReplies: React.Dispatch<React.SetStateAction<IReplyTweetModel[]>>;
}

const NewReply = (props: INewReplyProps) => {
  const { user } = useContext(AppContext);
  const [reply, setReply] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { replies, setReplies, tweetId, username } = props;
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (text: string) => {
    enqueueSnackbar(text);
  };

  const handleReplyChange = (e: BaseSyntheticEvent) => {
    setReply(e.target.value);
  };

  const handleTweetReply = async () => {
    if (IS_EMPTY_STRING(reply) || reply.length > 144) {
      showSnackbar(INCORRECT_REPLY);
    } else {
      const apiData = await addReply(username, tweetId, {
        reply: reply,
        userId: user.userId,
        tags: tags,
      });
      if (apiData.status === 200) {
        setReplies([
          ...replies,
          {
            replyId: "",
            reply: reply,
            repliedBy: user,
            tags: tags,
            replyDate: "",
          },
        ]);
        setReply("");
        setTags([]);
        showSnackbar(REPLY_POSTED);
      }
    }
  };

  return (
    <Grid container item xs={12} mx={2} my={1}>
      <Grid item xs={10} sm={11}>
        <Grid item xs={12}>
          <TextField
            className={styles.textField}
            id="new-post"
            label={NEW_REPLY.TEXTFIELD_LABEL}
            multiline
            rows={2}
            value={reply}
            onChange={handleReplyChange}
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
                isEditable
              />
            );
          })}
        </Grid>
        <NewTag tags={tags} setTags={setTags} />
      </Grid>
      <Grid item xs={2} sm={1} className={styles.buttonGrid}>
        <IconButton color="primary" onClick={handleTweetReply}>
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default NewReply;
