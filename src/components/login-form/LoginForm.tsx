import React, { useContext, useState } from "react";
import styles from "./LoginForm.module.css";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { LOGIN_FORM } from "../../constants/Static.constants";
import {
  INVALID_CREDENTIALS,
  LOGIN_SUCCESS,
  REQUIRED,
} from "../../constants/Snackbar.constants";
import { IS_EMPTY_STRING } from "../../utils/validations";
import { AppContext } from "../../context/AppContext";
import { LoginUser } from "../../services/Login.service";
import ForgotPassword from "../forgot-password-form/ForgotPasswordForm";
import RegisterForm from "../register-form/RegisterForm";

interface ILoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
}

const LoginForm = () => {
  const [values, setValues] = useState<ILoginFormState>({
    email: "",
    password: "",
    showPassword: false,
  });
  const [open, setOpen] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const { setIsUserActive, setUser } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (text: string) => {
    enqueueSnackbar(text);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleForgotPasswordOpen = () => {
    setOpenForgotPassword(true);
  };

  const handleChange =
    (prop: keyof ILoginFormState) =>
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

  const handleLogin = async () => {
    if (IS_EMPTY_STRING(values.email) || IS_EMPTY_STRING(values.password)) {
      showSnackbar(REQUIRED);
    } else {
      const apiData = await LoginUser(values.email, values.password);
      if (apiData && apiData.status === 200) {
        setIsUserActive && setIsUserActive(true);
        setUser &&
          setUser({
            ...apiData.data,
            userId: apiData.data.Id,
          });
        setValues({
          email: "",
          password: "",
          showPassword: false,
        });
        showSnackbar(LOGIN_SUCCESS);
      } else {
        showSnackbar(INVALID_CREDENTIALS);
      }
    }
  };

  return (
    <Card className={styles.card}>
      <RegisterForm open={open} setOpen={setOpen} />
      <ForgotPassword
        open={openForgotPassword}
        setOpen={setOpenForgotPassword}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel htmlFor="login-id">
                {LOGIN_FORM.LOGINID_LABEL}
              </InputLabel>
              <OutlinedInput
                id="login-id"
                required
                type={"text"}
                value={values.email}
                onChange={handleChange("email")}
                label={LOGIN_FORM.LOGINID_LABEL}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel htmlFor="password">
                {LOGIN_FORM.PASSWORD_LABEL}
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
                label={LOGIN_FORM.PASSWORD_LABEL}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              className={styles.buttonStyle}
              onClick={handleLogin}
            >
              {LOGIN_FORM.LOGIN_BUTTON}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              size="medium"
              className={styles.linkButtonStyle}
              onClick={handleForgotPasswordOpen}
            >
              {LOGIN_FORM.FORGOT_PASSWORD_TEXT}
            </Button>
          </Grid>
        </Grid>
        <hr className={styles.hrMargin} />
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={styles.linkButtonStyle}
            onClick={handleClickOpen}
          >
            {LOGIN_FORM.REGISTER_BUTTON}
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
