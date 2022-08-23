import React from "react";
import styles from "./Tag.module.css";
import { Grid, IconButton, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

interface ITagProps {
  tag: string;
  isEditable: boolean;
  tags?: string[];
  setTags?: React.Dispatch<React.SetStateAction<string[]>>;
  setEditedTags?: React.Dispatch<React.SetStateAction<string[]>>;
  isReply?: boolean;
  variant?:
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "overline"
    | "inherit"
}

const Tag = (props: ITagProps) => {
  const { tag, variant, isEditable, tags, setTags, isReply, setEditedTags } =
    props;

  const deleteTag = () => {
    const allTags = tags!.filter((item) => item !== tag);
    setTags && setTags(allTags);
    setEditedTags && setEditedTags(allTags);
  };

  return (
    <Grid
      item
      className={`${styles.tagContainer} ${
        isReply && isReply ? styles.tagReplyBgColor : styles.tagBgColor
      }`}
    >
      <Typography variant={variant} component={"span"} color={"primary"}>
        {`#${tag}`}
      </Typography>
      {isEditable && (
        <IconButton
          className={styles.iconButton}
          aria-label="close"
          size="small"
          color="primary"
          onClick={deleteTag}
        >
          <CancelIcon />
        </IconButton>
      )}
    </Grid>
  );
};

export default Tag;
