import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/userAction";

export default function SignOut() {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(logoutUser());
  };

  return (
    <button className="sign-out-btn" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
