import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./RegisterForm.module.css";
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
import { REGISTER_FORM } from "../../constants/Static.constants";
import { RegisterUser } from "../../services/Register.service";
import { useSnackbar } from "notistack";
import {
  INCORRECT_CONTACT,
  INCORRECT_EMAIL,
  LOGIN_TO_CONTINUE,
  PASSWORD_MATCH,
  REGISTER_SUCCESS,
  REQUIRED,
} from "../../constants/Snackbar.constants";
import { IS_CONTACT, IS_EMAIL, IS_EMPTY_STRING } from "../../utils/validations";

interface IRegisterFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface IRegisterFormState {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  contact: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

const RegisterForm = (props: IRegisterFormProps) => {
  const { open, setOpen } = props;
  const [values, setValues] = useState<IRegisterFormState>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    contact: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
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

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleRegistration = async () => {
    if (
      IS_EMPTY_STRING(values.firstName) ||
      IS_EMPTY_STRING(values.lastName) ||
      IS_EMPTY_STRING(values.email) ||
      IS_EMPTY_STRING(values.username) ||
      IS_EMPTY_STRING(values.password) ||
      IS_EMPTY_STRING(values.confirmPassword) ||
      IS_EMPTY_STRING(values.contact)
    ) {
      showSnackbar(REQUIRED);
    } else if (!IS_EMAIL(values.email)) {
      showSnackbar(INCORRECT_EMAIL);
    } else if (!IS_CONTACT(values.contact)) {
      showSnackbar(INCORRECT_CONTACT);
    } else if (values.password !== values.confirmPassword) {
      showSnackbar(PASSWORD_MATCH);
    } else {
      const postData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        username: values.username,
        password: values.password,
        contact: values.contact,
      };
      const apiData = await RegisterUser(postData);
      if (apiData.status === 201) {
        handleClose();
        showSnackbar(REGISTER_SUCCESS);
        showSnackbar(LOGIN_TO_CONTINUE);
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
                {REGISTER_FORM.TITLE}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" component="p" color={"primary"}>
                {REGISTER_FORM.SUB_TITLE}
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
          <Grid item xs={6}>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel htmlFor="firstname">
                {REGISTER_FORM.FIRSTNAME_LABEL}
              </InputLabel>
              <OutlinedInput
                id="firstname"
                required
                type={"text"}
                value={values.firstName}
                onChange={handleChange("firstName")}
                label={REGISTER_FORM.FIRSTNAME_LABEL}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel htmlFor="lastname">
                {REGISTER_FORM.SURNAME_LABEL}
              </InputLabel>
              <OutlinedInput
                id="lastname"
                required
                type={"text"}
                value={values.lastName}
                onChange={handleChange("lastName")}
                label={REGISTER_FORM.SURNAME_LABEL}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel htmlFor="email">
                {REGISTER_FORM.EMAIL_LABEL}
              </InputLabel>
              <OutlinedInput
                id="email"
                required
                type={"text"}
                value={values.email}
                onChange={handleChange("email")}
                label={REGISTER_FORM.EMAIL_LABEL}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel htmlFor="contact">
                {REGISTER_FORM.CONTACT_LABEL}
              </InputLabel>
              <OutlinedInput
                id="contact"
                required
                type={"text"}
                value={values.contact}
                onChange={handleChange("contact")}
                label={REGISTER_FORM.CONTACT_LABEL}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel htmlFor="username">
                {REGISTER_FORM.USERNAME_LABEL}
              </InputLabel>
              <OutlinedInput
                id="username"
                required
                type={"text"}
                value={values.username}
                onChange={handleChange("username")}
                label={REGISTER_FORM.USERNAME_LABEL}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel htmlFor="password">
                {REGISTER_FORM.PASSWORD_LABEL}
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
                label={REGISTER_FORM.PASSWORD_LABEL}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel htmlFor="confirm-password">
                {REGISTER_FORM.CONFIRM_PASSWORD_LABEL}
              </InputLabel>
              <OutlinedInput
                id="confirm-password"
                required
                type={values.showConfirmPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label={REGISTER_FORM.CONFIRM_PASSWORD_LABEL}
              />
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button variant="contained" onClick={handleRegistration} size="large">
          {REGISTER_FORM.REGISTER_BUTTON}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterForm;
