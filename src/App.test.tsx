import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import {
  APP_NAME,
  FORGOT_PASSWORD_FORM,
  REGISTER_FORM,
} from "./constants/Static.constants";
import userEvent from "@testing-library/user-event";

test("renders app name", () => {
  render(<App />);
  const appName = screen.getByText(APP_NAME);
  expect(appName).toBeInTheDocument();
});

test("renders login form", () => {
  render(<App />);
  const loginForm = screen.getByTestId("login-form");
  expect(loginForm).toBeInTheDocument();
  const loginId = screen.getByTestId("login-id");
  expect(loginId).toBeInTheDocument();
  const password = screen.getByTestId("password");
  expect(password).toBeInTheDocument();
  const loginBtn = screen.getByTestId("login-button");
  expect(loginBtn).toBeInTheDocument();
});

test("renders forget password form", async () => {
  render(<App />);
  const forgotPasswordBtn = screen.getByTestId("forgot-password-button");
  expect(forgotPasswordBtn).toBeInTheDocument();
  userEvent.click(forgotPasswordBtn);
  const forgotPasswordDialog = await screen.findByTestId(
    "forgot-password-dialog"
  );
  expect(forgotPasswordDialog).toBeInTheDocument();
  expect(screen.getByText(FORGOT_PASSWORD_FORM.TITLE)).toBeInTheDocument();
  expect(screen.getByText(FORGOT_PASSWORD_FORM.SUB_TITLE)).toBeInTheDocument();
  expect(screen.getByTestId("forgot-pwd-close-icon-btn")).toBeInTheDocument();
  expect(screen.getByTestId("forgot-pwd-username")).toBeInTheDocument();
  expect(screen.getByTestId("forgot-pwd-password")).toBeInTheDocument();
  expect(screen.getByTestId("forgot-pwd-close-btn")).toBeInTheDocument();
});

test("renders register form", async () => {
  render(<App />);
  const registerBtn = screen.getByTestId("register-button");
  expect(registerBtn).toBeInTheDocument();
  userEvent.click(registerBtn);
  const registerdDialog = await screen.findByTestId("register-dialog");
  expect(registerdDialog).toBeInTheDocument();
  expect(screen.getAllByText(REGISTER_FORM.TITLE)).toHaveLength(2);
  expect(screen.getByText(REGISTER_FORM.SUB_TITLE)).toBeInTheDocument();
  expect(
    screen.getByLabelText(REGISTER_FORM.FIRSTNAME_LABEL)
  ).toBeInTheDocument();
  expect(
    screen.getByLabelText(REGISTER_FORM.SURNAME_LABEL)
  ).toBeInTheDocument();
  expect(screen.getByLabelText(REGISTER_FORM.EMAIL_LABEL)).toBeInTheDocument();
  expect(
    screen.getByLabelText(REGISTER_FORM.CONTACT_LABEL)
  ).toBeInTheDocument();
  expect(
    screen.getByLabelText(REGISTER_FORM.USERNAME_LABEL)
  ).toBeInTheDocument();
  expect(
    screen.getByLabelText(REGISTER_FORM.PASSWORD_LABEL)
  ).toBeInTheDocument();
  expect(
    screen.getByLabelText(REGISTER_FORM.CONFIRM_PASSWORD_LABEL)
  ).toBeInTheDocument();
});
