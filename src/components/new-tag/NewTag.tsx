import React, { BaseSyntheticEvent, useState } from "react";
import styles from "./NewTag.module.css";
import { Grid, TextField } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSnackbar } from "notistack";
import { INCORRECT_TAG } from "../../constants/Snackbar.constants";
import { NEW_TAG } from "../../constants/Static.constants";
import { IS_EMPTY_STRING, IS_TAG } from "../../utils/validations";

interface INewTagProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setEditedTags?: React.Dispatch<React.SetStateAction<string[]>>;
}

const NewTag = (props: INewTagProps) => {
  const { tags, setTags, setEditedTags } = props;
  const [newTag, setNewTag] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (text: string) => {
    enqueueSnackbar(text);
  };

  const handleChange = (e: BaseSyntheticEvent) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    if (IS_EMPTY_STRING(newTag) || !IS_TAG(newTag) || newTag.length > 50) {
      showSnackbar(INCORRECT_TAG);
    } else {
      const allTags = [...tags, newTag];
      setTags(allTags);
      setEditedTags && setEditedTags(allTags);
      setNewTag("");
    }
  };

  return (
    <Grid item xs={12} className={styles.newTagContainer}>
      <TagIcon color="primary" className={styles.icon} />
      <TextField
        id="new-tag"
        className={styles.textField}
        label={NEW_TAG.ADD_TAG_LABEL}
        variant="standard"
        onChange={handleChange}
        value={newTag}
      />
      <AddCircleIcon
        color="primary"
        className={styles.icon}
        onClick={handleAddTag}
      />
    </Grid>
  );
};

export default NewTag;
