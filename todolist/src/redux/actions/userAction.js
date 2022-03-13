import { actionTypes } from "./actionTypes";

export const loginUser = (name) => {
  return {
    type: actionTypes.LOGIN_USER,
    payload: name,
  };
};

export const logoutUser = () => {
  return {
    type: actionTypes.LOGOUT_USER,
  };
};
