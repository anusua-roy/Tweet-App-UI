import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./ForgotPasswordForm.module.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { FORGOT_PASSWORD_FORM } from "../../constants/Static.constants";
import {
  LOGIN_TO_CONTINUE,
  PASSWORD_CHANGED,
  REQUIRED,
} from "../../constants/Snackbar.constants";
import { IS_EMPTY_STRING } from "../../utils/validations";
import { ForgotPassword } from "../../services/ForgotPassword.service";

interface IRegisterFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface IRegisterFormState {
  username: string;
  password: string;
  showPassword: boolean;
}

const ForgotPasswordForm = (props: IRegisterFormProps) => {
  const { open, setOpen } = props;
  const [values, setValues] = useState<IRegisterFormState>({
    username: "",
    password: "",
    showPassword: false,
  });
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (text: string) => {
    enqueueSnackbar(text);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange =
    (prop: keyof IRegisterFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleRegistration = async () => {
    if (IS_EMPTY_STRING(values.username) || IS_EMPTY_STRING(values.password)) {
      showSnackbar(REQUIRED);
    } else {
      const apiData = await ForgotPassword(values.username, values.password);
      if (apiData.status === 200) {
        showSnackbar(PASSWORD_CHANGED);
        showSnackbar(LOGIN_TO_CONTINUE);
        handleClose();
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle component="div" className={styles.dialogTitle}>
        <Grid container>
          <Grid container item xs={11}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h4" color={"primary"}>
                {FORGOT_PASSWORD_FORM.TITLE}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" component="p" color={"primary"}>
                {FORGOT_PASSWORD_FORM.SUB_TITLE}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <hr />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} my={1}>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel htmlFor="username">
                {FORGOT_PASSWORD_FORM.USERNAME_LABEL}
              </InputLabel>
              <OutlinedInput
                id="username"
                required
                type={"text"}
                value={values.username}
                onChange={handleChange("username")}
                label={FORGOT_PASSWORD_FORM.USERNAME_LABEL}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel htmlFor="password">
                {FORGOT_PASSWORD_FORM.PASSWORD_LABEL}
              </InputLabel>
              <OutlinedInput
                id="password"
                required
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={FORGOT_PASSWORD_FORM.PASSWORD_LABEL}
              />
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button variant="contained" onClick={handleRegistration} size="large">
          {FORGOT_PASSWORD_FORM.REGISTER_BUTTON}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordForm;
