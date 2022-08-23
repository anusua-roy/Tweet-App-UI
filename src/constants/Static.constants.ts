//Global constants
export const DEVICE_WIDTH = window.innerWidth;
export const DEVICE_SIZE = {
  lg: 1200,
  md: 900,
  sm: 600,
  xl: 1536,
  xs: 0,
};
export const APP_NAME = "tweet-app";
export const APP_SUBTEXT =
  "TweetApp helps you share with people all around the globe.";
export const BASE_URL = "https://localhost:44395/api/v1.0/tweets";

// Login Form Page constants
export const LOGIN_FORM = {
  LOGINID_LABEL: "Email or Username",
  PASSWORD_LABEL: "Password",
  LOGIN_BUTTON: "Log In",
  FORGOT_PASSWORD_TEXT: "Forgotten password?",
  REGISTER_BUTTON: "Create New Account",
};

//Forgot Password
export const FORGOT_PASSWORD_FORM = {
  TITLE: "Change Password",
  SUB_TITLE: "It's quick and easy with your username!",
  USERNAME_LABEL: "Username",
  PASSWORD_LABEL: "New Password",
  REGISTER_BUTTON: "Update",
};

// Register Form Page constants
export const REGISTER_FORM = {
  TITLE: "Register",
  SUB_TITLE: "It's quick and easy.",
  FIRSTNAME_LABEL: "Firstname",
  SURNAME_LABEL: "Surname",
  EMAIL_LABEL: "Email",
  USERNAME_LABEL: "Username",
  CONTACT_LABEL: "Contact",
  PASSWORD_LABEL: "Password",
  CONFIRM_PASSWORD_LABEL: "Confirm Password",
  REGISTER_BUTTON: "Register",
};

//Tweet App page constants
export const TWEET_APP_TABS_PAGE = {
  TWEETS_TAB_LABEL: "Tweets",
  USERS_TAB_LABEL: "Users",
  PROFILE_TAB_LABEL: "Profile",
  LOGOUT_TAB_LABEL: "Logout",
};

//Tweet page constants
export const TWEET_PAGE_CONSTANTS = {
  SHOW_COMMENTS: "SHOW COMMENTS",
  HIDE_COMMENTS: "HIDE COMMENTS",
};

//New Tweet page constants
export const NEW_TWEET = {
  TEXTFIELD_LABEL: "What's on your mind?",
  EDIT_TWEET_TEXTFIELD_LABEL: "Update Tweet",
  POST_BUTTON_TEXT: "Post",
  ADD_TAGS_BUTTON_TEXT: "Add Tag",
};

//Update Tweet page constants
export const UPDATE_TWEET = {
  CANCEL_BUTTON_TEXT: "CANCEL",
  UPDATE_BUTTON_TEXT: "UPDATE TWEET",
};

//Delete Tweet page constants
export const DELETE_TWEET = {
  DELETE_TITLE: "Delete Tweet",
  DELETE_PROMPT: "Are you sure you want to delete this tweet?",
  CANCEL_BUTTON_TEXT: "CANCEL",
  DELETE_BUTTON_TEXT: "DELETE TWEET",
};

//New Tag page constants
export const NEW_TAG = {
  ADD_TAG_LABEL: "Add a new tag...",
};

//New Reply page constants
export const NEW_REPLY = {
  TEXTFIELD_LABEL: "Reply...",
};
