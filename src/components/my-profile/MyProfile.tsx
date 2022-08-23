import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import UserProfile from "../user-profile/UserProfile";

const MyProfile = () => {
  const { user } = useContext(AppContext);

  return <UserProfile user={user}/>;
};

export default MyProfile;
